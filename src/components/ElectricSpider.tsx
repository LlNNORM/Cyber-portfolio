
import React, { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
}

interface Segment {
  pos: Point;
  nextPos: Point;
  length: number;
  angle: number;
}

interface Tentacle {
  x: number;
  y: number;
  length: number;
  count: number;
  random: number;
  segments: Segment[];
}

interface ElectricSpiderProps {
  excludedAreaRef: React.RefObject<HTMLElement | null>;
}

const distance = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  return Math.sqrt(
    Math.pow(x2 - x1, 2) +
      Math.pow(y2 - y1, 2)
  );
};

const createSegment = (
  parent: {
    x?: number;
    y?: number;
    nextPos?: Point;
  },
  length: number,
  angle: number,
  first: boolean
): Segment => {
  const pos = first
    ? {
        x: parent.x ?? 0,
        y: parent.y ?? 0,
      }
    : {
        x: parent.nextPos?.x ?? 0,
        y: parent.nextPos?.y ?? 0,
      };

  return {
    pos,
    length,
    angle,
    nextPos: {
      x: pos.x + length * Math.cos(angle),
      y: pos.y + length * Math.sin(angle),
    },
  };
};

const updateSegment = (
  segment: Segment,
  target: Point
) => {
  segment.angle = Math.atan2(
    target.y - segment.pos.y,
    target.x - segment.pos.x
  );

  segment.pos.x =
    target.x +
    segment.length *
      Math.cos(segment.angle - Math.PI);

  segment.pos.y =
    target.y +
    segment.length *
      Math.sin(segment.angle - Math.PI);

  segment.nextPos.x =
    segment.pos.x +
    segment.length *
      Math.cos(segment.angle);

  segment.nextPos.y =
    segment.pos.y +
    segment.length *
      Math.sin(segment.angle);
};

const fallbackSegment = (
  segment: Segment,
  target: Point
) => {
  segment.pos.x = target.x;
  segment.pos.y = target.y;

  segment.nextPos.x =
    segment.pos.x +
    segment.length *
      Math.cos(segment.angle);

  segment.nextPos.y =
    segment.pos.y +
    segment.length *
      Math.sin(segment.angle);
};

const createTentacle = (
  x: number,
  y: number,
  length: number,
  count: number
): Tentacle => {
  const segmentLength = length / count;

  const segments: Segment[] = [
    createSegment(
      { x, y },
      segmentLength,
      0,
      true
    ),
  ];

  for (let i = 1; i < count; i++) {
    segments.push(
      createSegment(
        segments[i - 1],
        segmentLength,
        0,
        false
      )
    );
  }

  return {
    x,
    y,
    length,
    count,
    random: Math.random(),
    segments,
  };
};

const moveTentacle = (
  tentacle: Tentacle,
  lastTarget: Point,
  target: Point
) => {
  const angle = Math.atan2(
    target.y - tentacle.y,
    target.x - tentacle.x
  );

  const dt =
    distance(
      lastTarget.x,
      lastTarget.y,
      target.x,
      target.y
    ) + 5;

  const adjustedTarget = {
    x:
      target.x -
      0.8 * dt * Math.cos(angle),

    y:
      target.y -
      0.8 * dt * Math.sin(angle),
  };

  updateSegment(
    tentacle.segments[
      tentacle.count - 1
    ],
    adjustedTarget
  );

  for (
    let i = tentacle.count - 2;
    i >= 0;
    i--
  ) {
    updateSegment(
      tentacle.segments[i],
      tentacle.segments[i + 1].pos
    );
  }

  if (
    distance(
      tentacle.x,
      tentacle.y,
      target.x,
      target.y
    ) <=
    tentacle.length +
      distance(
        lastTarget.x,
        lastTarget.y,
        target.x,
        target.y
      )
  ) {
    fallbackSegment(
      tentacle.segments[0],
      {
        x: tentacle.x,
        y: tentacle.y,
      }
    );

    for (
      let i = 1;
      i < tentacle.count;
      i++
    ) {
      fallbackSegment(
        tentacle.segments[i],
        tentacle.segments[i - 1].nextPos
      );
    }
  }
};

const drawTentacleHead = (
  ctx: CanvasRenderingContext2D,
  tentacle: Tentacle,
  target: Point
) => {
  const closeToTarget =
    distance(
      tentacle.x,
      tentacle.y,
      target.x,
      target.y
    ) <= tentacle.length;

  ctx.beginPath();

  ctx.arc(
    tentacle.x,
    tentacle.y,
    closeToTarget
      ? tentacle.random * 2 + 1
      : tentacle.random * 2,
    0,
    Math.PI * 2
  );

  ctx.fillStyle = closeToTarget
    ? "rgba(255,255,255,0.9)"
    : "rgba(0,139,139,0.45)";

  ctx.fill();
};

const drawTentacle = (
  ctx: CanvasRenderingContext2D,
  tentacle: Tentacle,
  target: Point
) => {
  if (
    distance(
      tentacle.x,
      tentacle.y,
      target.x,
      target.y
    ) > tentacle.length
  ) {
    return;
  }

  ctx.globalCompositeOperation = "lighter";

  ctx.beginPath();

  ctx.moveTo(
    tentacle.x,
    tentacle.y
  );

  for (const segment of tentacle.segments) {
    ctx.lineTo(
      segment.nextPos.x,
      segment.nextPos.y
    );
  }

  const hue =
    tentacle.random * 60 + 180;

  const lightness =
    tentacle.random * 35 + 35;

  ctx.strokeStyle =
    `hsl(${hue}, 100%, ${lightness}%)`;

  ctx.lineWidth =
    tentacle.random * 1.8 + 0.4;

  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.stroke();

  ctx.globalCompositeOperation =
    "source-over";
};

const ElectricSpider: React.FC<
  ElectricSpiderProps
> = ({ excludedAreaRef }) => {
  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  const pointerRef = useRef<Point | null>(
    null
  );

  const pointerInsideRef =
    useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    let animationId = 0;
    let time = 0;

    const target: Point = {
      x: width / 2,
      y: height / 2,
    };

    const lastTarget: Point = {
      x: target.x,
      y: target.y,
    };

    let tentacles: Tentacle[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width =
        `${width}px`;

      canvas.style.height =
        `${height}px`;

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );
    };

    const createTentacles = () => {
      tentacles = [];

      // Немного уменьшаем количество
      // на мобильных устройствах.
      const count =
        window.innerWidth < 768
          ? 120
          : 300;

      for (let i = 0; i < count; i++) {
        const minLength = 50;
        const maxLength = 300;

        const length =
          Math.random() *
            (maxLength - minLength) +
          minLength;

        tentacles.push(
          createTentacle(
            Math.random() * width,
            Math.random() * height,
            length,
            30
          )
        );
      }
    };

    resize();
    createTentacles();

    // ========================================================
    // Проверяем, находится ли курсор внутри
    // ИМЕННО ОКНА ТЕРМИНАЛА.
    // ========================================================

    const checkPointerInside = (
      x: number,
      y: number
    ) => {
      const element =
        excludedAreaRef.current;

      if (!element) {
        return false;
      }

      const rect =
        element.getBoundingClientRect();

      return (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
      );
    };

    // ========================================================
    // POINTER MOVE
    // ========================================================

    const handlePointerMove = (
      event: PointerEvent
    ) => {
      const x = event.clientX;
      const y = event.clientY;

      pointerRef.current = {
        x,
        y,
      };

      pointerInsideRef.current =
        checkPointerInside(x, y);
    };

    // ========================================================
    // POINTER LEAVE WINDOW
    // ========================================================

    const handlePointerLeave = () => {
      pointerRef.current = null;
      pointerInsideRef.current = false;
    };

    window.addEventListener(
      "pointermove",
      handlePointerMove,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "pointerleave",
      handlePointerLeave
    );

    window.addEventListener(
      "resize",
      resize
    );

    // ========================================================
    // AUTONOMOUS MOVEMENT
    // ========================================================

    const getAutonomousTarget = (): Point => {
      const q = 10;

      return {
        x:
          width / 2 +
          (height / 2 - q) *
            Math.sqrt(2) *
            Math.cos(time) /
            (Math.pow(Math.sin(time), 2) + 1),

        y:
          height / 2 +
          (height / 2 - q) *
            Math.sqrt(2) *
            Math.cos(time) *
            Math.sin(time) /
            (Math.pow(Math.sin(time), 2) + 1),
      };
    };

    // ========================================================
    // ANIMATION
    // ========================================================

    const draw = () => {
      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      const pointer =
        pointerRef.current;

      // ------------------------------------------------------
      // КУРСОР СНАРУЖИ ТЕРМИНАЛА
      // ------------------------------------------------------

      if (
        pointer &&
        !pointerInsideRef.current
      ) {
        target.x +=
          (pointer.x - target.x) / 10;

        target.y +=
          (pointer.y - target.y) / 10;
      }

      // ------------------------------------------------------
      // КУРСОР ВНУТРИ ТЕРМИНАЛА
      // ИЛИ КУРСОР ОТСУТСТВУЕТ
      // ------------------------------------------------------

      if (
        !pointer ||
        pointerInsideRef.current
      ) {
        const autoTarget =
          getAutonomousTarget();

        target.x +=
          (autoTarget.x - target.x) /
          30;

        target.y +=
          (autoTarget.y - target.y) /
          30;
      }

      // ------------------------------------------------------
      // CORE
      // ------------------------------------------------------

      const movement =
        distance(
          lastTarget.x,
          lastTarget.y,
          target.x,
          target.y
        );

      ctx.beginPath();

      ctx.arc(
        target.x,
        target.y,
        Math.min(
          movement + 5,
          18
        ),
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        "rgba(180,250,255,0.9)";

      ctx.shadowBlur = 20;
      ctx.shadowColor =
        "#0FF4F8";

      ctx.fill();

      ctx.shadowBlur = 0;

      // ------------------------------------------------------
      // TENTACLES
      // ------------------------------------------------------

      for (const tentacle of tentacles) {
        moveTentacle(
          tentacle,
          lastTarget,
          target
        );
      }

      for (const tentacle of tentacles) {
        drawTentacleHead(
          ctx,
          tentacle,
          target
        );
      }

      for (const tentacle of tentacles) {
        drawTentacle(
          ctx,
          tentacle,
          target
        );
      }

      lastTarget.x = target.x;
      lastTarget.y = target.y;

      time += 0.008;

      animationId =
        requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(
        animationId
      );

      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      window.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );

      window.removeEventListener(
        "resize",
        resize
      );
    };
  }, [excludedAreaRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="
        fixed
        inset-0
        w-full
        h-full
        pointer-events-none
        z-0
      "
      style={{
        opacity: 0.7,
        mixBlendMode: "screen",
      }}
    />
  );
};

export default ElectricSpider;

