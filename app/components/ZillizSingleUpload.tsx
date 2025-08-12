import { useState } from 'react';

export function ZillizSingleUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [response, setResponse] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        setFile(selectedFile || null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        setLoading(true);
        setError(null);
        setResponse(null);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('http://0.0.0.0:8080/zilliz/single', {
                method: 'POST',
                body: formData,
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
            <h2 className="text-xl font-bold mb-4 text-black">Zilliz Single File Upload</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="zilliz-single-file" className="block text-sm font-medium mb-2 text-black">
                        Select File:
                    </label>
                    <input
                        id="zilliz-single-file"
                        type="file"
                        onChange={handleFileChange}
                        className="w-full p-2 border border-black rounded-md text-black"
                        required
                    />
                </div>
                {file && (
                    <div className="text-sm text-black">
                        Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
                    </div>
                )}
                <button
                    type="submit"
                    disabled={loading || !file}
                    className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 disabled:bg-gray-400"
                >
                    {loading ? 'Uploading...' : 'Upload to Zilliz'}
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