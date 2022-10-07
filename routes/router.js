const router = require("express").Router();

// Redirecting to different routes
router.use("/auth", require("./auth"));
router.use("/day", require("./day"));
router.use("/paciente", require("./paciente"));
router.use("/service", require("./service"));
router.use("/turn", require("./turn"));

// Export API routes
module.exports = router;
