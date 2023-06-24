import { useQuery } from '@apollo/client';
import { gql } from 'apollo-boost';
import Link from 'next/link';
import client from '../lib/apolloClient';
import React from 'react';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
const GET_POLLS = gql`
  query GetPolls {
    polls {
      id
      question
    }
  }
`;

const LoadingSpinner = () => (
    <div className="flex items-center justify-center mt-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    </div>
);

type MessageProps = {
    message: string;
};

const ErrorMessage = ({ message }: MessageProps) => (
    <div className="text-red-500 mt-8">{message}</div>
);

const SuccessMessage = ({ message }: MessageProps) => (
    <div className="text-green-500 mt-8">{message}</div>
);


const Home = () => {

    const { loading, error, data } = useQuery(GET_POLLS);
    const router = useRouter();

    const polls = data?.polls || [];

    useEffect(() => {
        console.log(data);
    }, [data]);


    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorMessage message={`Error: ${error.message}`} />;
    }

    const goToCreatePoll = () => {
        router.push('/create-poll');
    };

    return (
        <div className="flex flex-col items-center mt-10">
            <h1 className="text-3xl font-bold mb-6">Lista de Enquetes</h1>
            <button onClick={goToCreatePoll}
             className="py-2 px-2 mt-4 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
                Criar uma nova enquete
            </button>
            <div className="mt-6">
                {polls.map((poll: any) => (
                    <div
                        key={poll.id}
                        className="w-96 p-4 mb-4 border border-gray-300 rounded-md"
                    >
                        <h2 className="text-xl font-medium mb-2">{poll.question}</h2>
                        <p className="text-gray-500 mb-2">
                            Total de votos: {poll.votes}
                        </p>
                        <a className="text-blue-500 hover:underline">Votar</a>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default Home;
