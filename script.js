let interval;

function calculate() {
  clearInterval(interval);

  let age = +document.getElementById("age").value;
  let gender = document.getElementById("gender").value;
  let weight = +document.getElementById("weight").value;
  let height = +document.getElementById("height").value;
  let activity = document.getElementById("activity").value;
  let sleep = +document.getElementById("sleep").value;

  if (!age || !weight || !height || !sleep) {
    alert("Fill all fields");
    return;
  }

  let base = gender === "male" ? 70 : 75;
  let score = 0;

  if (activity === "high") score += 5;
  if (activity === "low") score -= 5;

  if (sleep >= 7 && sleep <= 8) score += 3;
  else score -= 2;

  let bmi = weight / ((height / 100) ** 2);
  if (bmi >= 18.5 && bmi <= 24.9) score += 3;
  else score -= 3;

  let life = base + score;
  let remaining = life - age;

  if (remaining <= 0) {
    document.getElementById("result").innerHTML =
      "You've exceeded expectancy 🎉";
    return;
  }

  let target = new Date();
  target.setFullYear(target.getFullYear() + remaining);

  startCountdown(target);
  showTips(activity, sleep, bmi);
}

function startCountdown(target) {
  interval = setInterval(() => {
    let now = new Date();
    let diff = target - now;

    let d = Math.floor(diff / (1000*60*60*24));
    let h = Math.floor((diff / (1000*60*60)) % 24);
    let m = Math.floor((diff / (1000*60)) % 60);
    let s = Math.floor((diff / 1000) % 60);

    document.getElementById("result").innerHTML =
      `${d}d ${h}h ${m}m ${s}s remaining`;
  }, 1000);
}

function showTips(activity, sleep, bmi) {
  let tips = [];

  if (activity === "low") tips.push("Increase activity");
  if (sleep < 7) tips.push("Sleep 7–8 hours");
  if (bmi > 25) tips.push("Maintain healthy weight");

  document.getElementById("tips").innerHTML =
    "Tips: " + (tips.length ? tips.join(", ") : "Great lifestyle!");
}

function shareResult() {
  let text = document.getElementById("result").innerText;

  if (navigator.share) {
    navigator.share({ title: "My Result", text });
  } else {
    alert(text);
  }
}