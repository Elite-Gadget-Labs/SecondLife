"use client";

export function Soh() {
    return (
        <>
            <section className="w-full max-w-2xl p-8 bg-white dark:bg-gray-800 rounded-lg">
                <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-100">
                    Battery Second Life
                </h1>
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="relative w-full h-20 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                        <div
                            className="absolute top-0 left-0 h-full bg-green-500"
                            style={{
                                width: "75%",
                            }}
                        />
                        <div className="relative flex items-center justify-center w-full h-full">
                            <span className="text-2xl font-bold dark:text-gray-100">75%</span>
                        </div>
                    </div>
                    <p className="text-center text-gray-500 dark:text-gray-400">
                        Estimated time until battery is ready for its second life.
                    </p>
                </div>
                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-2 dark:text-gray-100">
                        How is the estimation calculated?
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        The estimated time for the battery's second life is calculated based
                        on several factors including the battery's age, usage, and overall
                        health. Our advanced algorithms analyze these factors to provide an
                        accurate estimation. Please note that the actual time may vary
                        depending on the battery's condition and usage patterns.
                    </p>
                </div>
            </section>
        </>
    );
}
