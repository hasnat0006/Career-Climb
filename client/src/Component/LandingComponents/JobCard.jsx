import React from 'react';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import {motion} from 'framer-motion';
import {useInView} from 'react-intersection-observer';

const JobCard = ({ logo, date, title, type, salary, location, description }) => {
    const navigate = useNavigate();
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.25,
    });

    return (
        <motion.div 
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="bg-green-opacity-10 hover:bg-green-opacity-20 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="space-y-4" >
                <div className="flex justify-between items-start">
                    <div className="h-10 w-10 relative">
                        <img
                            src={logo}
                            alt="Company logo"
                            className="object-contain rounded-md h-full w-full"
                        />
                    </div>
                    <span className="text-sm text-muted-foreground">{date}</span>
                </div>

                <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{title}</h3>
                    <div className="flex gap-2 text-sm">
                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">
                            {type}
                        </span>
                        <span className="bg-green-50 text-green-700 px-2 py-1 rounded">
                            {salary}
                        </span>
                    </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">
                    {description}
                </p>

                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{location}</span>
                    </div>
                    <button
                        onClick={() => {
                            navigate('/jobs');
                        }}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        More Details →
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default JobCard;