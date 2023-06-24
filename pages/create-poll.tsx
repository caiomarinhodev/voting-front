import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from 'apollo-boost';
import { useRouter } from 'next/router';

const CREATE_POLL_MUTATION = gql`
  mutation CreatePoll($question: String!) {
    createPoll(question: $question) {
      id
      question
    }
  }
`;
const CreatePoll = () => {
    const [question, setQuestion] = useState('');
    const [createPoll, { loading, error }] = useMutation(CREATE_POLL_MUTATION);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    };

    const handleGoBack = () => {
        router.back();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await createPoll({
                variables: {
                    question: question,
                },
            });
            setSuccess(true);
            console.log('Poll created:', data.createPoll);
            setQuestion('');
        } catch (error) {
            console.error('Error creating poll:', error);
        }
    };

    return (
        <div className="flex flex-col items-center mt-10">
            <h1 className="text-3xl font-bold mb-6">Criar Enquete</h1>
            <form onSubmit={handleSubmit} className="w-96">
                <div className="mb-4">
                    <label htmlFor="question" className="text-lg font-medium">
                        Pergunta:
                    </label>
                    <input
                        type="text"
                        id="question"
                        value={question}
                        onChange={handleQuestionChange}
                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 mt-4 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? 'Carregando...' : 'Criar'}
                </button>
                <button
                    type="button"
                    onClick={handleGoBack}
                    className="mt-4 text-blue-500 hover:underline"
                >
                    Voltar
                </button>
                {error && <p className="mt-4 text-red-500">{error.message}</p>}
                {success && <p className="mt-4 text-green-500">Enquete criada com sucesso!</p>}
            </form>
        </div>
    );
};

export default CreatePoll;
