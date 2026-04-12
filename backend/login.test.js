const axios = require("axios");

const BASE_URL = "http://localhost:5000/api";

// 1. Valid Login
test("Valid Login API Test", async () => {
    const res = await axios.post(BASE_URL + "/login", {
        email: "test@gmail.com",
        password: "123456"
    });

    expect(res.status).toBe(200);
});

// 2. Risk API - HIGH RISK
test("Risk API - High Risk Case", async () => {
    const res = await axios.post(BASE_URL + "/risk", {
        age: 50,
        bmi: 30,
        bp: "high",
        sugar: "high",
        smoking: "yes"
    });

    expect(res.status).toBe(200);
    expect(res.data.risk).toBe(100);           // 🔥 exact check
    expect(res.data.level).toBe("HIGH");       // 🔥 exact check
});

// 3. Risk API - LOW RISK
test("Risk API - Low Risk Case", async () => {
    const res = await axios.post(BASE_URL + "/risk", {
        age: 25,
        bmi: 20,
        bp: "normal",
        sugar: "normal",
        smoking: "no"
    });

    expect(res.status).toBe(200);
    expect(res.data.risk).toBe(0);             // 🔥 exact check
    expect(res.data.level).toBe("LOW");        // 🔥 exact check
});

// 4. Risk API - MEDIUM RISK
test("Risk API - Medium Risk Case", async () => {
    const res = await axios.post(BASE_URL + "/risk", {
        age: 45,
        bmi: 26,
        bp: "normal",
        sugar: "normal",
        smoking: "no"
    });

    expect(res.status).toBe(200);
    expect(res.data.risk).toBe(40);            // 🔥 exact check
    expect(res.data.level).toBe("MEDIUM");     // 🔥 exact check
});

// 5. Boundary Test (edge case)
test("Risk API - Boundary Case", async () => {
    const res = await axios.post(BASE_URL + "/risk", {
        age: 40,
        bmi: 25,
        bp: "normal",
        sugar: "normal",
        smoking: "no"
    });

    expect(res.status).toBe(200);
    expect(res.data.risk).toBe(0);             // boundary
    expect(res.data.level).toBe("LOW");
});

// 6. Partial Risk Case
test("Risk API - Partial Conditions", async () => {
    const res = await axios.post(BASE_URL + "/risk", {
        age: 50,
        bmi: 20,
        bp: "normal",
        sugar: "high",
        smoking: "no"
    });

    expect(res.status).toBe(200);
    expect(res.data.risk).toBe(45);            // 20 + 25
    expect(res.data.level).toBe("MEDIUM");
});