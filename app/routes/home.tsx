import type { Route } from "./+types/home";
import { QueryTester } from "../components/QueryTester";
import { PostgresSingleUpload } from "../components/PostgresSingleUpload";
import { PostgresMultipleUpload } from "../components/PostgresMultipleUpload";
import { ZillizSingleUpload } from "../components/ZillizSingleUpload";
import { ZillizMultipleUpload } from "../components/ZillizMultipleUpload";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "FastAPI Endpoint Tester" },
    { name: "description", content: "Test FastAPI endpoints for Aesper Agent" },
    ];
}

export default function Home() {
    return (
        <div className="min-h-screen bg-white py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                <header className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-black mb-2">
                        FastAPI Endpoint Tester
                    </h1>
                    <p className="text-black">
                        Test all 5 endpoints: query, postgres single/multiple, zilliz single/multiple
                    </p>
                </header>

                <div className="space-y-6">
                    <QueryTester />
                    <PostgresSingleUpload />
                    <PostgresMultipleUpload />
                    <ZillizSingleUpload />
                    <ZillizMultipleUpload />
                </div>
            </div>
        </div>
    );
}
