/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"

const CampaignPage = () => {
    const [campaigns, setCampaigns] = useState([])
    const [customers, setCustomers] = useState([])
    const [filteredAudience, setFilteredAudience] = useState([])
    const [currentCampaignMessage, setCurrentCampaignMessage] = useState("")

    const location = useLocation()
    const campaignName = location.state?.campaignName || "No Campaign Selected"

    useEffect(() => {
        fetch("http://localhost:8000/api/campaigns")
            .then((response) => response.json())
            .then((data) => {
                setCampaigns(data)
                console.log("Fetched campaigns data -> ", data)
            })
            .catch((error) => console.log("Error in fetching campaigns !! ", error))

        // fetch("http://localhost:8000/api/customers")
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setCustomers(data)
        //         console.log("Fetched customers -> ", data)
        //     })
        //     .catch((error) => console.log("Error in fetching customers !! ", error))

        fetch("http://localhost:8000/api/communicationLog")
            .then(response => response.json())
            .then((data) => {
                const filtered = data.filter((audience) => audience.campaign === campaignName)
                setFilteredAudience(filtered)
                console.log("Fetched audience -> ", data)
                console.log("Filtered audience according to campaign name -> ", filtered)
            })
            .catch((error) => console.log("Error in fetching audience segment for current campaign !! ", error))
    }, [])

    const handleCurrentCampaignMessageChange = (e) => {
        setCurrentCampaignMessage(e.target.value)
    }

    const sendCurrentCampaignMessage = async () => {
        if (!currentCampaignMessage.trim()) {
            alert("Please enter a message before sending !!")
            return;
        }

        try {
            const messageResponse = await fetch("http://localhost:8000/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ currentCampaignMessage, campaignName, filteredAudience })
            })

            if (!messageResponse.ok) {
                throw new Error("Some error in sending message to segmented audience !!")
            }

            const messageResult = await messageResponse.json()
            console.log("Message sent successfully -> ", messageResult)

            alert("Dummy Message API and Delivery Receipt API called successfully. !!")
        } catch (error) {
            console.error("Error in sending or logging campaign message -> ", error)
            alert("Failed to send or log campaign message!")
        }

        try {
            const response = await fetch("http://localhost:8000/api/campaigns", {
                method: "PUT",
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({campaignName, currentCampaignMessage})
            })

            if (!response.ok) {
                throw new Error(`Error updating campaign !! `)
            }
    
            const updatedCampaign = await response.json()

            console.log("Campaign updated successfully ! ", updatedCampaign)

        } catch (error) {
            console.log("Some error in updating campaign !! ", error)
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <div className="flex-grow p-6 bg-gray-100 min-h-96">
                {/* Campaign for segmented audience created before */}
                <div className="mb-20 shadow-lg p-4">
                    <h2 className="text-2xl font-bold text-black">
                        Current Campaign: <span className="text-sky-900">{campaignName}</span>
                    </h2>
                    <div className="mt-4">
                        <input
                            type="text"
                            value={currentCampaignMessage}
                            onChange={handleCurrentCampaignMessageChange}
                            className="w-full p-2 border rounded-md"
                            placeholder="Enter message for current campaign"
                        />
                        <button
                            onClick={sendCurrentCampaignMessage}
                            className="mt-4 bg-green-700 text-white px-4 py-2 rounded hover:bg-emerald-700"
                        >
                            Send Communication Log
                        </button>
                    </div>
                </div>

                <h1 className="text-lg font-bold text-gray-800 mb-6">Past Campaigns</h1>

                {/* Past Campaigns Sent Section*/}
                <div className="space-y-6">
                    {campaigns
                        .filter((campaign) => campaign.audienceCriteria && campaign.name !== campaignName)
                        .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .map((campaign) => (
                            <div
                                key={campaign._id}
                                className="bg-white p-4 rounded-md shadow"
                            >
                                <h2 className="text-xl font-semibold">{campaign.name}</h2>
                                <p className="text-gray-500">
                                    Audience Criteria: {campaign.audienceCriteria}
                                </p>
                                <p className="text-gray-500">
                                    Date: {new Date(campaign.createdAt).toLocaleString()}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default CampaignPage
