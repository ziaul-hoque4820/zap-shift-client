import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {CheckCircle,XCircle,User,Phone,Mail,MapPin,Calendar,Clock,Search,Filter,ChevronDown,ChevronUp,Bike,UserCheck,AlertCircle} from 'lucide-react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { timeAgo } from '../../../utils/utils';

const PendingRiders = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('all');
    const [selectedVehicle, setSelectedVehicle] = useState('all');
    const [expandedCard, setExpandedCard] = useState(null);
    const [showApprovedModal, setShowApprovedModal] = useState(false);
    const [showRejectedModal, setShowRejectedModal] = useState(false);

    // Fetch pending riders
    const { data: pendingRiders = [], isLoading, error } = useQuery({
        queryKey: ['pendingRiders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders/pending');
            return res.data;
        }
    });

    // Approve rider
    const handleApprove = async (riderId) => {
        try {
            await axiosSecure.patch(`/riders/${riderId}/status`, { status: 'approved' });
            setShowApprovedModal(true);
            queryClient.invalidateQueries(['pendingRiders']);

            // Auto hide modal after 3 seconds
            setTimeout(() => setShowApprovedModal(false), 3000);
        } catch (error) {
            console.error('Error approving rider:', error);
        }
    };

    // Reject rider
    const handleReject = async (riderId) => {
        try {
            await axiosSecure.patch(`/riders/${riderId}/status`, { status: 'rejected' });
            setShowRejectedModal(true);
            queryClient.invalidateQueries(['pendingRiders']);

            // Auto hide modal after 3 seconds
            setTimeout(() => setShowRejectedModal(false), 3000);
        } catch (error) {
            console.error('Error rejecting rider:', error);
        }
    };

    // Filter and search riders
    const filteredRiders = pendingRiders.filter(rider => {
        const matchesSearch =
            rider.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rider.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rider.contact?.includes(searchTerm);

        const matchesDistrict = selectedDistrict === 'all' || rider.district === selectedDistrict;
        const matchesVehicle = selectedVehicle === 'all' || rider.vehicleType === selectedVehicle;

        return matchesSearch && matchesDistrict && matchesVehicle;
    });

    // Get unique districts for filter
    const districts = ['all', ...new Set(pendingRiders.map(rider => rider.district).filter(Boolean))];

    // Get unique vehicle types
    const vehicleTypes = ['all', ...new Set(pendingRiders.map(rider => rider.vehicleType).filter(Boolean))];

    // Calculate application age in days
    const getApplicationAge = (createdAt) => {
        const created = new Date(createdAt);
        const now = new Date();
        const diffTime = Math.abs(now - created);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    // Get vehicle icon
    const getVehicleIcon = (type) => {
        switch (type) {
            case 'motorcycle': return <Bike className="h-5 w-5" />;
            case 'bicycle': return <Bike className="h-5 w-5" />;
            case 'scooter': return <Bike className="h-5 w-5" />;
            default: return <User className="h-5 w-5" />;
        }
    };

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bg-white rounded-xl shadow-sm p-6">
                                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
                <div className="text-center">
                    <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Riders</h2>
                    <p className="text-gray-600">Failed to load pending rider applications. Please try again.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
            {/* Success/Error Modals */}
            {showApprovedModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black bg-opacity-25 backdrop-blur-sm"></div>
                    <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md transform transition-all scale-100 animate-fadeIn">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                                <CheckCircle className="h-10 w-10 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Rider Approved!</h3>
                            <p className="text-gray-600">The rider has been approved successfully.</p>
                        </div>
                    </div>
                </div>
            )}

            {showRejectedModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black bg-opacity-25 backdrop-blur-sm"></div>
                    <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md transform transition-all scale-100 animate-fadeIn">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                                <XCircle className="h-10 w-10 text-red-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Rider Rejected</h3>
                            <p className="text-gray-600">The rider application has been rejected.</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Pending Rider Applications</h1>
                            <p className="text-gray-600 mt-2">
                                Review and manage new rider applications
                            </p>
                        </div>
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                            <UserCheck className="h-5 w-5 text-gray-400" />
                            <span className="text-sm font-medium text-gray-700">
                                {pendingRiders.length} Pending
                            </span>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-blue-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Applications</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{pendingRiders.length}</p>
                                </div>
                                <div className="p-3 bg-blue-50 rounded-lg">
                                    <User className="h-6 w-6 text-blue-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-green-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Today's Applications</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">
                                        {pendingRiders.filter(r => {
                                            const created = new Date(r.createdAt);
                                            const today = new Date();
                                            return created.toDateString() === today.toDateString();
                                        }).length}
                                    </p>
                                </div>
                                <div className="p-3 bg-green-50 rounded-lg">
                                    <Calendar className="h-6 w-6 text-green-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-purple-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Avg. Waiting Days</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">
                                        {pendingRiders.length > 0
                                            ? Math.round(pendingRiders.reduce((acc, r) => acc + getApplicationAge(r.createdAt), 0) / pendingRiders.length)
                                            : 0
                                        }
                                    </p>
                                </div>
                                <div className="p-3 bg-purple-50 rounded-lg">
                                    <Clock className="h-6 w-6 text-purple-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-amber-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Needs Review</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">
                                        {pendingRiders.filter(r => getApplicationAge(r.createdAt) > 3).length}
                                    </p>
                                </div>
                                <div className="p-3 bg-amber-50 rounded-lg">
                                    <AlertCircle className="h-6 w-6 text-amber-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search by name, email, or phone..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <select
                                    value={selectedDistrict}
                                    onChange={(e) => setSelectedDistrict(e.target.value)}
                                    className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    {districts.map(district => (
                                        <option key={district} value={district}>
                                            {district === 'all' ? 'All Districts' : district}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={selectedVehicle}
                                    onChange={(e) => setSelectedVehicle(e.target.value)}
                                    className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    {vehicleTypes.map(type => (
                                        <option key={type} value={type}>
                                            {type === 'all' ? 'All Vehicles' : type.charAt(0).toUpperCase() + type.slice(1)}
                                        </option>
                                    ))}
                                </select>

                                {/* <button className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                                    <Filter className="h-5 w-5 text-gray-600" />
                                </button> */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Applications Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredRiders.length === 0 ? (
                        <div className="col-span-full bg-white rounded-2xl shadow-sm p-12 text-center">
                            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                                <User className="h-12 w-12 text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Pending Applications</h3>
                            <p className="text-gray-600">
                                {pendingRiders.length === 0
                                    ? "All rider applications have been processed."
                                    : "No applications match your search criteria."}
                            </p>
                        </div>
                    ) : (
                        filteredRiders.map((rider) => (
                            <div
                                key={rider._id}
                                className={`bg-white rounded-2xl shadow-sm border-2 transition-all duration-300 hover:shadow-md ${expandedCard === rider._id ? 'border-blue-200' : 'border-transparent'
                                    }`}
                            >
                                <div className="p-5">
                                    {/* Rider Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center">
                                                {rider.userPhoto ? <img src={rider.userPhoto} alt="photo" /> : <User className="h-6 w-6 text-blue-600" />}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900">{rider.name}</h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getApplicationAge(rider.createdAt) > 3
                                                        ? 'bg-amber-100 text-amber-800'
                                                        : 'bg-blue-100 text-blue-800'
                                                        }`}>
                                                        {timeAgo(rider.appliedAt)}
                                                    </span>
                                                    <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                                                        {getVehicleIcon(rider.vehicleType)}
                                                        {rider.vehicleType}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setExpandedCard(expandedCard === rider._id ? null : rider._id)}
                                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                        >
                                            {expandedCard === rider._id ? (
                                                <ChevronUp className="h-5 w-5 text-gray-400" />
                                            ) : (
                                                <ChevronDown className="h-5 w-5 text-gray-400" />
                                            )}
                                        </button>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Phone className="h-4 w-4" />
                                            <span>{rider.contact}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Mail className="h-4 w-4" />
                                            <span className="truncate">{rider.email}</span>
                                        </div>
                                    </div>

                                    {/* Quick Info */}
                                    <div className="bg-gray-50 rounded-xl p-4 mb-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">District</p>
                                                <p className="font-medium text-gray-900 flex items-center gap-1">
                                                    <MapPin className="h-4 w-4" />
                                                    {rider.district}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">Applied On</p>
                                                <p className="font-medium text-gray-900">{formatDate(rider.createdAt)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expanded Details */}
                                    {expandedCard === rider._id && (
                                        <div className="animate-fadeIn">
                                            <div className="border-t border-gray-100 pt-4 mt-4">
                                                <h4 className="font-medium text-gray-900 mb-3">Additional Information</h4>

                                                <div className="space-y-3">
                                                    <div>
                                                        <p className="text-xs text-gray-500 mb-1">NID</p>
                                                        <p className="text-sm font-medium text-gray-900">{rider.nid}</p>
                                                    </div>

                                                    <div>
                                                        <p className="text-xs text-gray-500 mb-1">Parent's Contact</p>
                                                        <p className="text-sm font-medium text-gray-900">{rider.parentContact}</p>
                                                    </div>

                                                    {rider.vehicleRegNo && (
                                                        <div>
                                                            <p className="text-xs text-gray-500 mb-1">Vehicle Registration</p>
                                                            <p className="text-sm font-medium text-gray-900">{rider.vehicleRegNo}</p>
                                                        </div>
                                                    )}

                                                    {rider.areasToRide && rider.areasToRide.length > 0 && (
                                                        <div>
                                                            <p className="text-xs text-gray-500 mb-2">Preferred Areas</p>
                                                            <div className="flex flex-wrap gap-2">
                                                                {Array.isArray(rider.areasToRide)
                                                                    ? rider.areasToRide.map((area, index) => (
                                                                        <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                                                                            {area}
                                                                        </span>
                                                                    ))
                                                                    : <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                                                                        {rider.areasToRide}
                                                                    </span>
                                                                }
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 mt-6">
                                        <button
                                            onClick={() => handleReject(rider._id)}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl font-medium transition-colors"
                                        >
                                            <XCircle className="h-5 w-5" />
                                            Reject
                                        </button>
                                        <button
                                            onClick={() => handleApprove(rider._id)}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-xl font-medium transition-colors"
                                        >
                                            <CheckCircle className="h-5 w-5" />
                                            Approve
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default PendingRiders;