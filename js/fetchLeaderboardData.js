/**
 * 
  username: string;
  token_address: string;
  win_rate: string;
  token_symbol: string;
  mcatc: string;
  ath: string;
  profit: number;
 */
const medals = ["🥇", "🥈", "🥉"];

const updateLeaderboard = () => {
  fetch("https://search-api.sectbot.com/contestleaderboard") // Replace with your API URL
  //fetch("http://localhost:3000/contestleaderboard") // Replace with your API URL
    .then((response) => response.json())
    .then((data) => {
      const leaderboard = document.getElementById("leaderboard"); // Replace with your leaderboard container ID
      leaderboard.innerHTML = ""; // Clear existing content

      data.forEach((user, i) => {
        const row = document.createElement("div");
        row.className = "leaderboard_raw";
        const username = user.username;
        const winRate = user.win_rate + "%";
        const prefix = i <= 2 ? medals[i] : i + 1;

        // Fill the row with user data
        row.innerHTML = `
                    <div class="name">
                        <div class="leaderboard_title">${prefix}. ${username} ${user.tier.emoji} ${user.tier.title}</div>
                    </div>
                    <div class="win_points">
                        <div class="leaderboard_title">${user.win_points}</div>
                    </div>
                    <div class="total_calls">
                        <div class="leaderboard_title">${user.calls_count}</div>
                    </div>
                    <div class="winrate">
                        <div class="leaderboard_title">${winRate}</div>
                    </div>
                    <div class="xs">
                        <div class="leaderboard_title">${formatProfit(user.total_profit)}x</div>
                    </div>
                `;

        // Append the row to the leaderboard
        leaderboard.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

const extractDexViewUrl = (tokenAddress) => {
  // STUPID QUICK FIX
  if (tokenAddress.substr(0, 2) == "0x") {
    return `https://www.dextools.io/app/en/ether/pair-explorer/${tokenAddress}`;
  }

  return `https://www.dextools.io/app/en/solana/pair-explorer/${tokenAddress}`;
};
const formatUsername = (username) => {
  if (username.length > 4) return `${username.substr(0, 2)}...${username.slice(-2)}`;

  return `${username.charAt(0)}...${username.slice(-2)}`;
};

const formatNumber = (num) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num;
};

const formatProfit = (profit) => {
  return parseFloat(profit).toFixed(1);
};
updateLeaderboard();
