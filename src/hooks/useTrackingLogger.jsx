import React from 'react';
import useAxiosSecure from './useAxiosSecure';

const useTrackingLogger = () => {
    const axiosSecure = useAxiosSecure();

    const logTracking = async ({ tracking_id, status, details, location, updated_by, rider_contact }) => {
        try {
            const payload = {
                tracking_id,
                status,
                details,
                location,
                updated_by,
                rider_contact
            };
            await axiosSecure.post("/trackings", payload);
        } catch (error) {
            console.error("Failed to log tracking:", error);
        }
    };

    return { logTracking };
};

export default useTrackingLogger;