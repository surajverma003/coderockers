import React from 'react'
import { pulse } from '../../data/homeData';

const FeaturedSkeleton = () => (
    <>
        <div className={`lg:col-span-3 lg:row-span-2 min-h-[26rem] rounded-3xl ${pulse}`} aria-hidden="true" />
        {[0, 1].map((i) => (
            <div key={i} className={`lg:col-span-2 h-44 rounded-2xl ${pulse}`} aria-hidden="true" />
        ))}
    </>
);

export default FeaturedSkeleton
