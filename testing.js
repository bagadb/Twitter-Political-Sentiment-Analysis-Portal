const { exec } = require("child_process");

exec("python3 ~/CollegeProject/Twitter-Political-Sentiment-Analysis-Portal/python-scripts/stub.py", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});