import React from 'react'
import Hero from './hero/Hero'
import AboutCard from '../about/AboutCard'
import CoursesCard from '../courses/CoursesCard'
import Apoint from './apoint/Apoint'
import FeaturesCard from '../features/FeaturesCard'
import TeamCard from '../team/TeamCard'
import TestimonialCard from '../testimonial/TestimonialCard'

const Home = () => {
    return (
        <>
            <Hero />
            <AboutCard />
            <CoursesCard />

            <FeaturesCard />
            <TeamCard />
            <TestimonialCard />
        </>
    )
}

export default Home
