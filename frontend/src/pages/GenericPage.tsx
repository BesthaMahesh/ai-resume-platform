import Sidebar from "../components/Sidebar";

export default function GenericPage({ title, description }: { title: string, description: string }) {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />
            <div className="flex-1 lg:ml-72 p-4 pt-24 lg:p-8 transition-all duration-300">
                <header className="mb-8 border-b pb-6 border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">{title}</h1>
                    <p className="text-gray-600 font-medium">{description}</p>
                </header>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center text-center py-20">
                    <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Under Construction</h3>
                    <p className="text-gray-500 max-w-md">We're currently building the {title} module with AI-powered capabilities. Check back soon!</p>
                </div>
            </div>
        </div>
    );
}
