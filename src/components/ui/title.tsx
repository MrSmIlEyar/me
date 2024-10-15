import React from 'react';
import {cn} from "@/lib/utils";

interface Props {
    text: string;
    className?: string;
}

export const Title: React.FC<Props> = ({text, className}) => {
    return (
        <div className={cn('', className)}>
            <h1 className='text-3xl'>{text}</h1>
        </div>
    );
};

