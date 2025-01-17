import React, { useState } from 'react';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SkillBoostPage = () => {
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.25,
    });

    const navigate = useNavigate();
    const [popupContent, setPopupContent] = useState(null);

    const actions = {
        python: "Advance your Python skills by working on projects like web applications, data analysis pipelines, or APIs. Use resources from Codecademy, Coursera, and the Python official documentation. Practice writing clean, efficient code and unit tests. Consider contributing to open-source projects.Join Python communities like Reddit's r/learnpython or Stack Overflow to ask questions and share knowledge. Attend local meetups or online webinars to network with other Python developers.",
        git: "Master Git by learning rebasing, cherry-picking, and handling merge conflicts. Contribute to open-source projects via GitHub, and practice with tools like GitLab CI/CD for real-world applications. Use Git GUIs like Sourcetree or GitKraken for visualizing branches and commits. Attend Git workshops or webinars to learn advanced Git workflows and best practices.",
        dsa: "Data Structures & Algorithms are critical for problem-solving. Use GeeksforGeeks, LeetCode, and HackerRank to practice dynamic programming, graph traversal, and tree algorithms regularly. Focus on time and space complexity analysis to optimize your solutions. Attend algorithmic coding contests like Google Code Jam or Codeforces to test your skills against other developers.",
        problemSolving: "Improve your problem-solving skills by attempting coding challenges on platforms like HackerRank and CodeWars. Focus on optimizing your solutions and understanding time complexity. Join coding communities like LeetCode's Discuss forum or r/learnprogramming to ask questions and learn from others. Attend coding bootcamps or workshops to practice coding under time constraints and improve your problem-solving speed.",
        htmlCss: "Build responsive layouts with advanced HTML5 and CSS3 techniques. Experiment with CSS Grid, Flexbox, and TailwindCSS. Refer to MDN Web Docs for detailed tutorials and best practices. Create a personal portfolio website or blog to showcase your projects and skills. Attend web design workshops or online courses to learn about the latest trends and tools in front-end development.",
        jsFundamentals: "Learn JavaScript ES6+ features like modules, async/await, and arrow functions. Build small projects like calculators or interactive web components to apply your knowledge. Use MDN Web Docs and JavaScript.info. to deepen your understanding of JavaScript concepts. Join JavaScript communities like r/javascript or Dev.to to share your projects and learn from others. Attend JavaScript meetups or webinars to stay updated on the latest frameworks and libraries.",
        reactAngular: "Dive into React or Angular frameworks by building dynamic web applications. Use resources from React Docs, Udemy, and YouTube tutorials to master hooks, state management, and lifecycle methods. Create reusable components and practice stateful and stateless architecture. Join React or Angular communities like r/reactjs or r/angular to ask questions and share your projects. Attend local meetups or online webinars to learn about advanced features and best practices in React or Angular development."
    };

    const TableContents = [
        {
            skill: "Programming in Python",
            requiredLevel: "Proficient",
            currentStatus: "Intermediate",
            learningResources: "Codecademy, Coursera",
            priorityLevel: "High",
            estimatedTime: "2-3 months",
            actionKey: "python"
        },
        {
            skill: "Version Control (Git)",
            requiredLevel: "Strong",
            currentStatus: "Basic",
            learningResources: "GitHub Docs, GitLab",
            priorityLevel: "High",
            estimatedTime: "1-2 months",
            actionKey: "git"
        },
        {
            skill: "Data Structures & Algorithms",
            requiredLevel: "Strong",
            currentStatus: "Missing",
            learningResources: "GeeksforGeeks, LeetCode",
            priorityLevel: "High",
            estimatedTime: "3-4 months",
            actionKey: "dsa"
        },
        {
            skill: "Problem Solving",
            requiredLevel: "Strong",
            currentStatus: "Developing",
            learningResources: "LeetCode, HackerRank",
            priorityLevel: "Medium",
            estimatedTime: "2-3 months",
            actionKey: "problemSolving"
        },
        {
            skill: "HTML/CSS Expertise",
            requiredLevel: "Proficient",
            currentStatus: "Intermediate",
            learningResources: "MDN Web Docs, TailwindCSS",
            priorityLevel: "High",
            estimatedTime: "1-2 months",
            actionKey: "htmlCss"
        },
        {
            skill: "JavaScript Fundamentals",
            requiredLevel: "Proficient",
            currentStatus: "Developing",
            learningResources: "MDN Web Docs, JavaScript.info",
            priorityLevel: "High",
            estimatedTime: "2-3 months",
            actionKey: "jsFundamentals"
        },
        {
            skill: "React/Angular Frameworks",
            requiredLevel: "Strong",
            currentStatus: "Missing",
            learningResources: "React Docs, Angular Docs",
            priorityLevel: "High",
            estimatedTime: "3-4 months",
            actionKey: "reactAngular"
        }
    ]

    const PeopleAlsoSearch = [
        {
            id: 1,
            role: "Data Scientist",
            description: "Protect systems and networks from cyber threats."
        },
        {
            id: 2,
            role: "Fullstack Developer",
            description: "Handle both frontend and backend development tasks."
        },
        {
            id: 3,
            role: "Blockchain Developer",
            description: "Develop and maintain blockchain-based applications."
        },
        {
            id: 4,
            role: "Machine Learning Engineer",
            description: "Build and deploy machine learning models for AI applications."
        }
    ]

    const handlePopup = (actionKey) => {
        setPopupContent(actions[actionKey]);
    };

    const closePopup = () => {
        setPopupContent(null);
    };

    return (
        <div className="min-h-screen bg-[#f9f9f9] overflow-y-scroll relative">
            <Navbar />
            <div className="p-8">
                <div className="text-center mb-8">
                    <motion.h1
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2, ease: 'backInOut' }}
                        className="text-4xl uppercase font-Bai_Jamjuree underline    font-bold text-black">Skill Boost Analysis</motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3, ease: 'backInOut' }}
                        className="text-lg text-black mt-2">
                        Compare your current skills with job requirements and find ways to grow!
                    </motion.p>
                </div>
                <div className="text-left mt-12">
                    <motion.h1
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4, ease: 'backInOut' }}
                        className="text-2xl font text-[#5A3C1B]">
                        Showing analysis to help you become a Front-End Developer
                    </motion.h1>
                </div>

                {/* Skill Table */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    ref={ref}
                    transition={{ duration: 0.5, delay: 0.5, ease: 'backInOut' }}
                    className="w-full rounded-lg overflow-hidden shadow-lg mt-6">
                    <table className="table-auto w-full border-collapse text-left">
                        <thead>
                            <tr className="bg-[#9DBAAD] text-black">
                                <th className="py-5 px-6 text-lg font-bold border border-[#5A7D66]">Skill</th>
                                <th className="py-5 px-6 text-lg font-bold border border-[#5A7D66]">Required Level</th>
                                <th className="py-5 px-6 text-lg font-bold border border-[#5A7D66]">Current Status</th>
                                <th className="py-5 px-6 text-lg font-bold border border-[#5A7D66]">Learning Resources</th>
                                <th className="py-5 px-6 text-lg font-bold border border-[#5A7D66]">Priority Level</th>
                                <th className="py-5 px-6 text-lg font-bold border border-[#5A7D66]">Estimated Time to Improve</th>
                                <th className="py-5 px-6 text-lg font-bold border border-[#5A7D66]">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {TableContents.map((content, index) => (
                                <motion.tr
                                    key={index}
                                    ref={ref}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1, ease: 'backInOut' }}
                                    className="bg-gradient-to-r from-[#E6F2E5] via-[#DCECE2] to-[#D2E8D8] hover:bg-gradient-to-r hover:from-[#D2E8D8] hover:via-[#C8E3CF] hover:to-[#BEE0C6]"
                                >
                                    <td className="py-4 px-6 border border-[#B9D7B8]">{content.skill}</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">{content.requiredLevel}</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">{content.currentStatus}</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">{content.learningResources}</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">{content.priorityLevel}</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8]">{content.estimatedTime}</td>
                                    <td className="py-4 px-6 border border-[#B9D7B8] text-center">
                                        <button
                                            className="text-[#007BFF] hover:underline hover:text-[#0056b3]"
                                            onClick={() => handlePopup(content.actionKey)}
                                        >
                                            {`Complete advanced ${content.skill} projects or courses`}
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
                {/* Pop-up */}
                <AnimatePresence>
                    {popupContent && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                            transition={{ duration: 0.5, ease: 'backInOut' }}
                            className="fixed inset-0 z-10 flex items-center justify-center backdrop-blur-md bg-[rgba(0,0,0,0.3)]">
                            <div className="bg-white w-10/12 sm:w-5/12 rounded-lg p-8 shadow-2xl relative transform scale-105">
                                {/* Close Button */}
                                <button
                                    className="absolute top-3 right-3 text-red-500 font-bold text-2xl hover:text-red-700 hover:scale-110 transition-all duration-300"
                                    onClick={closePopup}
                                >
                                    ×
                                </button>
                                {/* Pop-up Content */}
                                <p className="text-black text-lg leading-relaxed">{popupContent}</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* "Want to see the Road Map" Section */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.7, ease: 'backInOut' }}
                className="text-left mt-6">
                    <button
                        onClick={() => navigate('/roadmap')}
                        className="text-[#704F2A] text-lg hover:underline hover:text-[#5A3C1B] transition-all duration-300"
                    >
                        Want to see the Road Map to this post?
                    </button>
                </motion.div>

                {/* People Also Search For Section */}
                <div className="mt-16">
                    <div className="border-t border-gray-300 mb-6"></div>
                    <motion.h2 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.7, ease: 'backInOut' }}
                    className="text-2xl font-bold text-[#704F2A] mb-8">People also search for :</motion.h2>
                    <div className="grid grid-cols-4 gap-8">
                        {PeopleAlsoSearch.map((person, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.7 + index * 0.1, ease: 'backInOut' }}
                                className="bg-[#E6F2E5] py-4 rounded-lg flex-col flex justify-center items-center shadow-md hover:shadow-lg hover:bg-[#cad4c9]"
                            >
                                <h3 className="text-lg font-bold text-[#5A3C1B] mb-2">{person.role}</h3>
                                <p className="text-sm text-center text-[#5A3C1B] p-2 w-full" >{person.description}</p>
                                <button
                                    className="bg-[#A5C2AE] text-black py-2 px-8 rounded-lg hover:bg-[#89A78D] hover:shadow-xl transition-all duration-300"
                                >
                                    Explore now →
                                </button>
                            </motion.div>
                        ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillBoostPage;
