import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"

const AudiencePage = () => {
    const [customers, setCustomers] = useState([])
    const [conditions, setConditions] = useState([])
    const [logic, setLogic] = useState("AND")
    const [audienceSize, setAudienceSize] = useState(0)
    const [campaignMessage, setCampaignMessage] = useState("")
    const [filteredAudience, setFilteredAudience] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/login') // Redirect to login if not authenticated
        }
        
        fetch("https://crm-app-backend-cjvk.onrender.com/api/customers", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
            if (!response.ok) {
            throw new Error('Error in fetching customers data !!')
            }
            return response.json()
        })
        .then((data) => {
            setCustomers(data)
            console.log("Fetched customers: ", data)
        })
        .catch((error) => console.error("Error fetching customers !! ", error))
    }, [navigate])

    const addCondition = () => {
        setConditions([...conditions, { field: "", operator: "", value: "" }])
    }

    const updateCondition = (index, field, value) => {
        const newConditions = [...conditions]
        newConditions[index][field] = value
        setConditions(newConditions)
    }

    const calculateAudienceSize = () => {
        let filteredCustomers = [...customers]

        if (logic === "AND") {
            conditions.forEach(({ field, operator, value }) => {
                if (field && value && operator) {
                    filteredCustomers = filteredCustomers.filter((customer) => {
                    if (field === "totalSpent") {
                        if (operator === ">") {
                            return customer.totalSpent > value
                        } else if (operator === "<") {
                            return customer.totalSpent < value
                        } else if (operator === ">=") {
                            return customer.totalSpent >= value
                        } else if (operator === "<=") {
                            return customer.totalSpent <= value
                        }
                    } else if (field === "lastVisit") {
                        const dateEntered = new Date(value)
                        // console.log("Date entered: ", dateEntered)
                        
                        if (operator === ">") {
                            return new Date(customer.lastVisit) > dateEntered
                        } else if (operator === "<") {
                            return new Date(customer.lastVisit) < dateEntered
                        } else if (operator === ">=") {
                            return new Date(customer.lastVisit) >= dateEntered
                        } else if (operator === "<=") {
                            return new Date(customer.lastVisit) <= dateEntered
                        }
                    }
                    })
                }
            })
        } else {
            filteredCustomers = filteredCustomers.filter((customer) =>
            conditions.some(({ field, operator, value }) => {
                if (field && value && operator) {
                if (field === "totalSpent") {
                    if (operator === ">") {
                        return customer.totalSpent > value
                    } else if (operator === "<") {
                        return customer.totalSpent < value
                    } else if (operator === ">=") {
                        return customer.totalSpent >= value
                    } else if (operator === "<=") {
                        return customer.totalSpent <= value
                    }
                } else if (field === "lastVisit") {
                    const dateEntered = new Date(value)
                    // console.log("Date entered: ", dateEntered)
                    
                    if (operator === ">") {
                        return new Date(customer.lastVisit) > dateEntered
                    } else if (operator === "<") {
                        return new Date(customer.lastVisit) < dateEntered
                    } else if (operator === ">=") {
                        return new Date(customer.lastVisit) >= dateEntered
                    } else if (operator === "<=") {
                        return new Date(customer.lastVisit) <= dateEntered
                    }
                }
                }

                return false
            })
            )
        }

        setAudienceSize(filteredCustomers.length)
        setFilteredAudience(filteredCustomers)
    }

    const saveAudience = async () => {
        if (filteredAudience.length === 0) {
            alert("No audience selected. Please calculate your audience size first.");
            return;
        }

        // entering data in campaign model 
        try {
            const audienceCriteria = conditions.map(({ field, operator, value }) => {
                return `${field} ${operator} ${value}`
            }).join(` ${logic} `)

            const newCampaign = ({
                name: campaignMessage,
                audienceCriteria: audienceCriteria,
                message: ""
            })

            // console.log("Campaign: ", newCampaign)
            
            const response = await fetch("https://crm-app-backend-cjvk.onrender.com/api/campaigns", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(newCampaign)
            })

            if(!response.ok) {
                throw new Error('Error in saving campaign !!')
            }

            const data = await response.json()
            console.log("Campaign saved successfully : ", data)

        } catch (error) {
            console.log("Error in saving audience segement under the campaign !! ", error)
        }

        // entering data in communication_log for that campaign name
        try {
            const communicationLogData = filteredAudience.map((customer) => ({
                    campaign: campaignMessage,
                    customerId: customer._id,
                    customerName: customer.name,
                }
            ))

            const response = await fetch("https://crm-app-backend-cjvk.onrender.com/api/communicationLog", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(communicationLogData)
            })

            if(!response.ok) {
                throw new Error('Some error while saving segmented audience in communication log !!')
            }

            const data = await response.json()
            console.log("Segmented Audience saved successfully : ", data)
            
        } catch (error) {
            console.log("Error in saving audience segement in communication_log table !! ", error)
        }

        navigate('/campaign', { state: { campaignName: campaignMessage } })
    }

  return (
    <div className="min-h-screen flex flex-col">
        <Header/>

        <div className="flex-grow p-6 bg-gray-100 min-h-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Audience Segment</h1>

            {/* Segmenting customers based on Criteria Section */}
            <div className="space-y-4">
                {conditions.map((condition, index) => (
                <div key={index} className="flex flex-wrap gap-4 bg-white p-4 rounded-md shadow">
                    <select
                    className="p-2 border rounded-md w-full md:w-1/4"
                    value={condition.field}
                    onChange={(e) => updateCondition(index, "field", e.target.value)}
                    >
                        <option value="">Select Field</option>
                        <option value="totalSpent">Total Spent</option>
                        <option value="lastVisit">Last Visit</option>
                    </select>
                    <select
                    className="p-2 border rounded-md w-full md:w-1/4"
                    value={condition.operator}
                    onChange={(e) => updateCondition(index, "operator", e.target.value)}
                    >
                        <option value="">Select Operator</option>
                        <option value=">">Greater than</option>
                        <option value="<">Less than</option>
                        <option value="<=">Less than or equal</option>
                        <option value=">=">Greater than or equal</option>
                    </select>
                    <input
                    type={condition.field === "lastVisit" ? "date" : "number"}
                    className="p-2 border rounded-md w-full md:w-1/4"
                    value={condition.value}
                    onChange={(e) => updateCondition(index, "value", e.target.value)}
                    placeholder="Value"
                    />
                    <button
                    onClick={() => setConditions(conditions.filter((condition, ind) => ind !== index))}
                    className="text-red-500 hover:text-red-300"
                    >
                    Remove
                    </button>
                </div>
                ))}

                <button
                onClick={addCondition}
                className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-800"
                >
                Add Condition
                </button>
            </div>

            {/* AND/OR Selection Part */}
            <div className="mt-4">
                <label className="block text-black font-medium mb-2">Logic</label>
                <select
                className="p-2 border rounded-md w-full md:w-1/2 lg:w-1/4"
                value={logic}
                onChange={(e) => setLogic(e.target.value)}
                >
                <option value="AND">AND</option>
                <option value="OR">OR</option>
                </select>

                <label className="mt-4 block text-black font-medium mb-2">Campaign Name</label>
                <input type="text" 
                value={campaignMessage}
                onChange={((e) => setCampaignMessage(e.target.value))} 
                className="p-2 border rounded-md w-full md:w-1/2 lg:w-1/4"
                placeholder="Enter you campaign name"
                required
                />
            </div>

            {/* Rest Part */}
            <div className="mt-6 flex flex-wrap gap-4">
                <button
                onClick={calculateAudienceSize}
                className="bg-emerald-600 text-white px-4 py-2 rounded shadow hover:bg-green-600"
                >
                Check Your Audience Size
                </button>
                <button
                onClick={saveAudience}
                className="bg-indigo-500 text-white px-4 py-2 rounded shadow hover:bg-indigo-800"
                >
                Save Your Audience
                </button>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold text-black">
                Audience Size: <span className="text-green-600">{audienceSize}</span>
                </h2>
            </div>
        </div>

        <Footer/>
    </div>
  )
}

export default AudiencePage
