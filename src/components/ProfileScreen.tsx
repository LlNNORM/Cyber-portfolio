// import React from 'react';
// import { motion } from 'framer-motion';
// import { Progress } from './ui/progress';

// interface ProfileScreenProps {
//   onBack: () => void;
// }

// const ProfileScreen: React.FC<ProfileScreenProps> = ({ onBack }) => {
//   const skills = [
//     { name: 'JavaScript', level: 90, color: '#A020F0' },
//     { name: 'TypeScript', level: 85, color: '#00E0FF' },
//     { name: 'React', level: 95, color: '#0FF4F8' },
//     { name: 'Redux', level: 80, color: '#A020F0' },
//     { name: 'REST API', level: 88, color: '#00E0FF' },
//     { name: 'Git', level: 92, color: '#0FF4F8' }
//   ];

//   const stats = [
//     { label: 'Years of Experience', value: '3+', icon: '⚡' },
//     { label: 'Projects Completed', value: '50+', icon: '🚀' },
//     { label: 'Coffee Consumed', value: '∞', icon: '☕' },
//     { label: 'Bugs Fixed', value: '999+', icon: '🐛' }
//   ];

//   return (
//     <div className="fixed inset-0 bg-[#0a0a0f] cyber-grid p-4 md:p-8">
//       <div className="scanline"></div>
      
//       <motion.div 
//         className="max-w-6xl mx-auto h-full flex flex-col"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.8 }}
//       >
//         {/* Header */}
//         <motion.div 
//           className="flex items-center justify-between mb-8"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2, duration: 0.5 }}
//         >
//           <button
//             onClick={onBack}
//             className="cyber-border rounded-lg px-4 py-2 jetbrains text-[#00E0FF] hover:bg-[#A020F0] hover:bg-opacity-20 transition-all duration-300"
//           >
//             {'< BACK'}
//           </button>
//           <h1 className="orbitron text-2xl md:text-4xl text-[#A020F0] cyber-text-glow tracking-wider">
//             NEURAL PROFILE
//           </h1>
//           <div className="jetbrains text-[#0FF4F8] text-sm">
//             Status: <span className="text-[#00ff41] cyber-flicker">ONLINE</span>
//           </div>
//         </motion.div>

//         <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Avatar Section */}
//           <motion.div 
//             className="cyber-border rounded-lg bg-[#050508] p-6 flex flex-col items-center justify-center space-y-6"
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.4, duration: 0.6 }}
//           >
//             {/* 3D Avatar */}
//             <div className="relative w-48 h-48 mx-auto">
//               <div className="absolute inset-0 cyber-border rounded-full bg-gradient-to-br from-[#A020F0] to-[#00E0FF] p-2">
//                 <div className="w-full h-full bg-[#050508] rounded-full flex items-center justify-center relative overflow-hidden">
//                   {/* Avatar silhouette */}
//                   <div className="w-32 h-32 bg-gradient-to-b from-[#00E0FF] to-[#A020F0] rounded-full opacity-60 cyber-glow"></div>
//                   <div className="absolute inset-4 border-2 border-[#0FF4F8] rounded-full cyber-flicker"></div>
                  
//                   {/* Neural network effect */}
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <div className="w-2 h-2 bg-[#00E0FF] rounded-full cyber-glow"></div>
//                     <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-[#A020F0] rounded-full cyber-glow"></div>
//                     <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-[#0FF4F8] rounded-full cyber-glow"></div>
//                     <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-[#00E0FF] rounded-full cyber-glow"></div>
//                     <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-[#A020F0] rounded-full cyber-glow"></div>
//                   </div>
//                 </div>
//               </div>
//               <div className="absolute inset-0 cyber-glow rounded-full"></div>
//             </div>

//             {/* Stats Grid */}
//             <div className="grid grid-cols-2 gap-4 w-full">
//               {stats.map((stat, index) => (
//                 <motion.div
//                   key={stat.label}
//                   className="cyber-border rounded bg-[#0a0a0f] p-3 text-center"
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
//                 >
//                   <div className="text-2xl mb-1">{stat.icon}</div>
//                   <div className="jetbrains text-xl text-[#00E0FF] cyber-text-glow">{stat.value}</div>
//                   <div className="jetbrains text-xs text-[#0FF4F8]">{stat.label}</div>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>

//           {/* Profile Info */}
//           <motion.div 
//             className="space-y-6"
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.6, duration: 0.6 }}
//           >
//             {/* Personal Info Card */}
//             <div className="cyber-border rounded-lg bg-[#050508] p-6">
//               <h2 className="orbitron text-xl text-[#A020F0] cyber-text-glow mb-4 tracking-wider">
//                 PERSONAL DATA
//               </h2>
//               <div className="space-y-3 jetbrains">
//                 <div className="flex justify-between">
//                   <span className="text-[#0FF4F8]">Name:</span>
//                   <span className="text-[#00E0FF] cyber-text-glow">Linnorm</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-[#0FF4F8]">Role:</span>
//                   <span className="text-[#00E0FF]">Frontend Developer</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-[#0FF4F8]">Location:</span>
//                   <span className="text-[#00E0FF]">Cyberspace</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-[#0FF4F8]">Status:</span>
//                   <span className="text-[#00ff41] cyber-flicker">Available</span>
//                 </div>
//               </div>
//             </div>

//             {/* Skills Section */}
//             <div className="cyber-border rounded-lg bg-[#050508] p-6">
//               <h2 className="orbitron text-xl text-[#A020F0] cyber-text-glow mb-6 tracking-wider">
//                 SKILL MATRIX
//               </h2>
//               <div className="space-y-4">
//                 {skills.map((skill, index) => (
//                   <motion.div
//                     key={skill.name}
//                     className="space-y-2"
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 1 + index * 0.1, duration: 0.3 }}
//                   >
//                     <div className="flex justify-between jetbrains text-sm">
//                       <span className="text-[#0FF4F8]">{skill.name}</span>
//                       <span className="text-[#00E0FF]">{skill.level}%</span>
//                     </div>
//                     <div className="cyber-border rounded-full bg-[#0a0a0f] h-2 overflow-hidden">
//                       <motion.div
//                         className="h-full cyber-glow"
//                         style={{ backgroundColor: skill.color }}
//                         initial={{ width: 0 }}
//                         animate={{ width: `${skill.level}%` }}
//                         transition={{ delay: 1.2 + index * 0.1, duration: 0.8, ease: "easeOut" }}
//                       />
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default ProfileScreen;


import React from 'react';
import { motion } from 'framer-motion';
import Logo from '../assets/dragon-logo.svg?react';
import profileImg from '../assets/profile.webp';
import profileImg2 from '../assets/profile2.webp';
import profileImg3 from '../assets/profile3.webp';

interface ProfileScreenProps {
  onBack: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onBack }) => {
  const skills = [
    { name: 'JavaScript', level: 90, color: '#FFD700', category: 'Programming' },
    { name: 'TypeScript', level: 85, color: '#00E0FF', category: 'Programming' },
    { name: 'React', level: 95, color: '#0FF4F8', category: 'Frontend' },
    { name: 'Redux', level: 80, color: '#A020F0', category: 'State Management' },
    { name: 'REST API', level: 88, color: '#00ff41', category: 'Backend' },
    { name: 'Git', level: 92, color: '#FF6B35', category: 'DevOps' },
    { name: 'CSS/SCSS', level: 87, color: '#FF3366', category: 'Styling' },
    { name: 'Node.js', level: 83, color: '#00D9FF', category: 'Backend' },
    { name: 'MongoDB', level: 75, color: '#A020F0', category: 'Database' },
    { name: 'Webpack', level: 78, color: '#0FF4F8', category: 'Build Tools' },
    { name: 'Jest', level: 82, color: '#00ff41', category: 'Testing' },
    { name: 'Docker', level: 70, color: '#00E0FF', category: 'DevOps' },
    { name: 'Three.js', level: 73, color: '#FFD700', category: '3D Graphics' },
    { name: 'GraphQL', level: 76, color: '#FF6B35', category: 'API' },
    { name: 'Next.js', level: 85, color: '#FF3366', category: 'Framework' },
    { name: 'Tailwind', level: 90, color: '#00D9FF', category: 'Styling' },
    { name: 'Framer Motion', level: 84, color: '#A020F0', category: 'Animation' },
    { name: 'WebSocket', level: 79, color: '#0FF4F8', category: 'Real-time' }
  ];

  const stats = [
    { label: 'Years of Experience', value: '3+', icon: '⚡' },
    { label: 'Projects Completed', value: '50+', icon: '🚀' },
    { label: 'Coffee Consumed', value: '∞', icon: '☕' },
    { label: 'Bugs Fixed', value: '999+', icon: '🐛' }
  ];

  const achievements = [
    { title: 'React Specialist', description: 'Expert in React ecosystem', icon: '⚛️', color: '#0FF4F8' },
    { title: 'TypeScript Advocate', description: 'Strong typing enthusiast', icon: '🔷', color: '#00E0FF' },
    { title: 'Performance Optimizer', description: 'Application speed guru', icon: '⚡', color: '#FFD700' },
    { title: 'UI/UX Designer', description: 'Beautiful interfaces creator', icon: '🎨', color: '#A020F0' },
    { title: 'Problem Solver', description: 'Complex challenges resolver', icon: '🧠', color: '#00ff41' },
    { title: 'Team Player', description: 'Collaborative development', icon: '🤝', color: '#FF6B35' }
  ];

  return (
    <div className="fixed inset-0 bg-[#0a0a0f] cyber-grid p-4 md:p-8">
      <div className="scanline"></div>
      
      <motion.div 
        className="max-w-7xl mx-auto h-full flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <button
            onClick={onBack}
            className="cyber-border rounded-lg px-4 py-2 jetbrains text-[#00E0FF] hover:bg-[#A020F0] hover:bg-opacity-20 transition-all duration-300"
          >
            {'< BACK TO TERMINAL'}
          </button>
          <h1 className="orbitron text-2xl md:text-4xl text-[#A020F0] cyber-text-glow tracking-wider">
            NEURAL PROFILE
          </h1>
          <div className="jetbrains text-[#0FF4F8] text-sm">
            Status: <span className="text-[#00ff41] cyber-flicker">ONLINE</span>
          </div>
        </motion.div>

        <div className="flex-1 grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Avatar & Stats */}
          <img className="cyber-border rounded-lg" src={profileImg} alt="Profile image" />
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {/* Avatar Section */}
            <div className="cyber-border rounded-lg bg-[#050508] p-6 flex flex-col items-center space-y-6">
              {/* 3D Avatar */}
              <div className="relative w-40 h-40 mx-auto">
                <div className="absolute inset-0 cyber-border rounded-full bg-gradient-to-br from-[#A020F0] to-[#00E0FF] p-2">
                  <div className="w-full h-full bg-[#050508] rounded-full flex items-center justify-center relative">
                    {/* Avatar silhouette */}
                      <Logo   width={110} height={110} className="glowing-logo" />
                  </div>
                </div>
              </div>

              {/* Personal Info */}
              
              <div className="w-full space-y-3 jetbrains text-center">
                <h2 className="orbitron text-xl text-[#A020F0] cyber-text-glow">
                  LINNORM
                </h2>
                <div className="text-[#00E0FF]">Frontend Developer</div>
                <div className="text-[#0FF4F8] text-sm">Neural Interface Specialist</div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="cyber-border rounded bg-[#050508] p-4 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="jetbrains text-lg text-[#00E0FF] cyber-text-glow">{stat.value}</div>
                  <div className="jetbrains text-xs text-[#0FF4F8]">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Center Column - 3D Skills Sphere */}
          
          <img className="cyber-border rounded-lg" src={profileImg3} alt="Profile image" />

        </div>

        {/* Bottom Section - Achievements */}
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="cyber-border rounded-lg bg-[#050508] p-6">
            <h2 className="orbitron text-xl text-[#A020F0] cyber-text-glow mb-4 tracking-wider">
              ACHIEVEMENTS & SPECIALIZATIONS
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  className="cyber-border rounded bg-[#0a0a0f] p-3 text-center hover:cyber-glow transition-all duration-300 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-2xl mb-2">{achievement.icon}</div>
                  <div 
                    className="jetbrains text-sm cyber-text-glow mb-1"
                    style={{ color: achievement.color }}
                  >
                    {achievement.title}
                  </div>
                  <div className="jetbrains text-xs text-[#0FF4F8] opacity-80">
                    {achievement.description}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfileScreen;