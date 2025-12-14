import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

function TrackParcel() {
    const { trackingId } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data = [], isLoading, error } = useQuery({
        queryKey: ["tracking", trackingId],
        enabled: !!trackingId,
        queryFn: async () => {
            const res = await axiosSecure.get(`/trackings/${trackingId}`);
            return res.data;
        },
    });

    if (isLoading) return <p>Loading tracking...</p>;

    if (error) {
        return <p className="text-red-500">Tracking not found</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">
                Tracking ID: {trackingId}
            </h2>

            <ol className="relative border-l border-gray-300">
                {data.map((item, index) => (
                    <li key={index} className="mb-8 ml-6">
                        <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-white">
                            ✓
                        </span>

                        <h3 className="font-semibold text-lg">{item.status}</h3>
                        <p className="text-gray-600">{item.details}</p>
                        <p className="text-sm text-gray-500">
                            📍 {item.location} •{" "}
                            {new Date(item.timestamp).toLocaleString()}
                        </p>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default TrackParcel;
