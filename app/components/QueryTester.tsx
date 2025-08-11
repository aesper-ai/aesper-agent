import { useState } from 'react';

export function QueryTester() {
    const [text, setText] = useState('');
    const [response, setResponse] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResponse(null);

        try {
            const res = await fetch('http://0.0.0.0:8080/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(text),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            setResponse(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border border-black rounded-lg p-4 mb-6">
            <h2 className="text-xl font-bold mb-4 text-black">Query Endpoint Test</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="query-text" className="block text-sm font-medium mb-2 text-black">
                        Query Text:
                    </label>
                    <textarea
                        id="query-text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full p-2 border border-black rounded-md text-black"
                        rows={3}
                        placeholder="Enter your query text here..."
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
                >
                    {loading ? 'Sending...' : 'Send Query'}
                </button>
            </form>

            {error && (
                <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-md text-red-700">
                    Error: {error}
                </div>
            )}

            {response && (
                <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-md">
                    <h3 className="font-bold mb-2 text-black">Response:</h3>
                    <pre className="text-sm text-black">{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}