import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from 'apollo-boost';
import { useRouter } from 'next/router';

const VOTE_MUTATION = gql`
  mutation Vote($pollId: ID!, $optionId: ID!) {
    vote(pollId: $pollId, optionId: $optionId) {
      id
      question
      options {
        id
        text
        votes
      }
    }
  }
`;

const VotePoll = () => {
    const router = useRouter();
    const pollId = router.query.id
    const [selectedOption, setSelectedOption] = useState('');
    const [vote] = useMutation(VOTE_MUTATION);


    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { data } = await vote({
                variables: {
                    pollId: pollId, // Substitua pelo ID real da enquete
                    optionId: selectedOption,
                },
            });
            console.log('Vote submitted:', data.vote);
            setSelectedOption('');
        } catch (error) {
            console.error('Error submitting vote:', error);
        }
    };

    return (
        <div>
            <h1>Votar na Enquete</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="radio"
                        id="Yes"
                        value="Yes"
                        checked={selectedOption === 'Yes'}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="Yes">Sim</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="No"
                        value="No"
                        checked={selectedOption === 'No'}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="No">Não</label>
                </div>
                <button type="submit">Votar</button>
            </form>
        </div>
    );
};

export default VotePoll;
