"use client";

interface SohProps {
    sohValue: number;
}

export function Soh({ sohValue }: SohProps) {
    return (
        <>
            <section className="w-full max-w-2xl p-8 bg-white dark:bg-gray-800 rounded-lg">
                <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-100">
                    State of Health (SoH)
                </h1>
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="relative w-full h-20 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                        <div
                            className="absolute top-0 left-0 h-full bg-green-500"
                            style={{
                                width: `${sohValue}%`,
                            }}
                        />
                        <div className="relative flex items-center justify-center w-full h-full">
                            <span className="text-2xl font-bold dark:text-gray-100">
                                {sohValue}%
                            </span>
                        </div>
                    </div>
                    <p className="text-center text-gray-500 dark:text-gray-400">
                        Remaining percentage of original cell capacity.
                    </p>
                </div>
                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-2 dark:text-gray-100">
                        How is the estimation calculated?
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        The State of Health (SoH) of a battery is estimated by assessing its
                        current capacity compared to its original capacity and analyzing
                        changes in internal resistance. These factors, along with data on
                        charge/discharge cycles, voltage, and temperature, help determine
                        the batterys remaining lifespan and overall health. Accurate SoH
                        estimation is vital for managing battery systems in applications
                        like electric vehicles and electronics.
                    </p>
                </div>
            </section>
        </>
    );
}
