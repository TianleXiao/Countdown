// 数据层：精准配置你的重要考试节点 (使用 ISO 8601 标准格式)
const events = [
    { name: "SA2 考试", targetDate: "2026-06-25T00:00:00" },
    { name: "雅思考试", targetDate: "2026-08-01T00:00:00" }
];

const wrapper = document.getElementById('events-wrapper');

// 初始化渲染静态结构
events.forEach((event, index) => {
    const eventDiv = document.createElement('div');
    eventDiv.className = 'event-item';
    
    const displayDate = event.targetDate.split('T')[0].replace(/-/g, ' . ');

    eventDiv.innerHTML = `
        <div class="event-header">
            <span class="event-name">${event.name}</span>
            <span class="target-date">${displayDate}</span>
        </div>
        <div class="time-display" id="timer-${index}">
            </div>
    `;
    wrapper.appendChild(eventDiv);
});

// 核心倒计时驱动引擎
function updateTimers() {
    const now = new Date().getTime();

    events.forEach((event, index) => {
        const targetTime = new Date(event.targetDate).getTime();
        const timeRemaining = targetTime - now;
        const timerContainer = document.getElementById(`timer-${index}`);

        // 状态拦截：已结束的处理
        if (timeRemaining <= 0) {
            if (timerContainer.innerHTML !== '<div class="completed">Concluded</div>') {
                timerContainer.innerHTML = '<div class="completed">Concluded</div>';
                timerContainer.style.display = 'block';
            }
            return;
        }

        // 精确换算时间
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        // 补零对齐逻辑
        const fDays = days.toString().padStart(2, '0');
        const fHours = hours.toString().padStart(2, '0');
        const fMinutes = minutes.toString().padStart(2, '0');
        const fSeconds = seconds.toString().padStart(2, '0');

        // 生成新的 HTML 内容
        const nextHTML = `
            <div class="time-box">
                <div class="time-value">${fDays}</div>
                <div class="time-label">Days</div>
            </div>
            <div class="time-box">
                <div class="time-value">${fHours}</div>
                <div class="time-label">Hrs</div>
            </div>
            <div class="time-box">
                <div class="time-value">${fMinutes}</div>
                <div class="time-label">Min</div>
            </div>
            <div class="time-box">
                <div class="time-value">${fSeconds}</div>
                <div class="time-label">Sec</div>
            </div>
        `;

        // 仅在数据真实变动时更新 DOM，减少重绘，保持极致的丝滑感
        if (timerContainer.innerHTML !== nextHTML) {
            timerContainer.innerHTML = nextHTML;
        }
    });
}

// 立即执行一次防止白幕
updateTimers();

// 开启每秒刷新
setInterval(updateTimers, 1000);