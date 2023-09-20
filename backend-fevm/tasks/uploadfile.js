import lighthouse from "@lighthouse-web3/sdk";
// ... other code
const path = "/path/to/file.jpg"
const apiKey = "thisisaateststring"

const dealParam_default = {
	"network":"calibration"
}

// Default parameters set. All RaaS workers enabled, any miners can take the deal. 2 MiB mock file added.
const uploadfile = async(file) => {
const response = await lighthouse.upload(path, apiKey, false,dealParam_default); //"hash in response is the cid "

let conformation = await axios.get("https://api.lighthouse.storage/api/lighthouse/get_proof", {
    params: {
        cid: lighthouse_cid,
        network: "calibration" // Change the network to mainnet when ready
    }
})
}