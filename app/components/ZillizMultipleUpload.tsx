import { useState } from 'react';

export function ZillizMultipleUpload() {
    const [files, setFiles] = useState<FileList | null>(null);
    const [response, setResponse] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFiles(e.target.files);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!files || files.length === 0) return;

        setLoading(true);
        setError(null);
        setResponse(null);

        try {
            const formData = new FormData();
            Array.from(files).forEach(file => {
                formData.append('files', file);
            });

            const res = await fetch('http://0.0.0.0:8080/zilliz/multiple', {
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
            <h2 className="text-xl font-bold mb-4 text-black">Zilliz Multiple Upload</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="zilliz-multiple-files" className="block text-sm font-medium mb-2 text-black">
                        Select Multiple Files:
                    </label>
                    <input
                        id="zilliz-multiple-files"
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="w-full p-2 border border-black rounded-md text-black"
                        required
                    />
                </div>
                {files && files.length > 0 && (
                    <div className="text-sm text-black">
                        Selected {files.length} files:
                        <ul className="mt-1 ml-4">
                            {Array.from(files).map((file, index) => (
                                <li key={index}>
                                    {file.name} ({(file.size / 1024).toFixed(2)} KB)
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <button
                    type="submit"
                    disabled={loading || !files || files.length === 0}
                    className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 disabled:bg-gray-400"
                >
                    {loading ? 'Uploading...' : 'Upload to Zilliz (Multiple)'}
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