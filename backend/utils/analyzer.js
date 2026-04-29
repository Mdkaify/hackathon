function analyzeResponse(input) {
    input = input.toLowerCase();

    if (input.includes("formula") && !input.includes("why")) {
        return {
            type: "Rote Learning",
            message: "You memorized but didn’t understand."
        };
    }

    if (input.length < 10) {
        return {
            type: "Guessing",
            message: "Too short, likely guessing."
        };
    }

    return {
        type: "Partial Understanding",
        message: "You understand partially."
    };
}

module.exports = { analyzeResponse };