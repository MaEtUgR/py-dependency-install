const core = require("@actions/core");
const exec = require("@actions/exec");

async function run() {
  const requirementsPath = core.getInput("path");
  const updatePip = core.getInput("update-pip");
  const updateSetuptools = core.getInput("update-setuptools");
  const updatePackaging = core.getInput("update-packaging");
  const updateWheel = core.getInput("update-wheel");

  // ====================
  // Install dependencies
  // ====================
  try {
    // update wheel
    if (updateWheel === "true") {
      console.log("[*] Updating wheel package...");
      await exec.exec("python -m pip install --upgrade wheel");
    }
    // update setuptools
    if (updateSetuptools === "true") {
      console.log("[*] Updating setuptools package...");
      await exec.exec("python -m pip install --upgrade setuptools");
    }
    // update packaging
    if (updateSetuptools === "true") {
      console.log("[*] Updating packaging package...");
      await exec.exec("python -m pip install --upgrade packaging");
    }
    // update pip
    if (updatePip === "true") {
      console.log("[*] Updating pip package...");
      await exec.exec("python -m pip install --upgrade pip");
    }

    // install Python dependency definitions in user-defined requirements.txt file path
    console.log("[*] Installing Python dependencies...");
    await exec.exec(`python -m pip install -r ${requirementsPath}`);
    console.log("");
    console.log("[*] The environment contains the following Python packages:");
    await exec.exec("python -m pip list");
  } catch (error) {
    core.setFailed(
      `ERROR: Action failed during dependency installation attempt with error: ${error.message}`
    );
  }
}

run();
