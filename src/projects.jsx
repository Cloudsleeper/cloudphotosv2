import { useState } from "react";
import 'tailwindcss/tailwind.css';

const Projects = () => {
    const projects = [
        {
            title: "Negative Space",
            description: "A photographic exploration where reality softens at the edges, inviting viewers into spaces where mystery feels like home.",
            image: "/img/darktreesitting.jpg",
            link: "/filmprojectpage"
        },
    ];

    return (
        <div className="min-h-screen bg-[#000000] text-white">
            {/* Header Image with Centered Text */}
            <div className="w-full h-[50vh] sm:h-[70vh] mb-6 sm:mb-8 relative">
                <img
                    src="/img/running%20in%20the%20snow.jpg"
                    alt="Header"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white text-center px-4">
                        Projects
                    </h1>
                </div>
            </div>

            {/* Description Section */}
            <div className="px-4 sm:px-6 md:px-12 lg:px-24 mb-8 sm:mb-12">
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-white text-base sm:text-lg md:text-xl leading-relaxed">
                        Welcome to my portfolio of creative projects. Here you'll find a collection of my work spanning photography, film, and visual storytelling. Each project represents a unique narrative and artistic vision, carefully crafted to capture moments and tell compelling stories.
                    </p>
                </div>
            </div>

            {/* projects List */}
            <main className="px-4 sm:px-6 py-8 sm:py-12 md:px-12 lg:px-24">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-16 sm:gap-y-24">
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                className={`flex flex-col ${index % 2 === 0 ? 'lg:mr-auto' : 'lg:ml-auto'}`}
                            >
                                <a href={project.link} className="overflow-hidden mb-4 sm:mb-6">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full aspect-[4/3] object-cover transition-transform duration-700 ease-in-out hover:scale-105"
                                    />
                                </a>
                                <div className="max-w-md">
                                    <h2 className="text-lg sm:text-xl mb-3 sm:mb-4 font-normal tracking-wide">
                                        {project.title}
                                    </h2>
                                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                                        {project.description}
                                    </p>
                                    <a
                                        href={project.link}
                                        className="inline-block text-sm text-white hover:text-gray-400 transition-colors border-b border-white hover:border-gray-400 w-fit"
                                    >
                                        Learn More
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Projects;
