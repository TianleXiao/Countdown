// 数据层：定义所有的倒计时事件
const events = [
    { name: "日文N2报名", targetDate: "2025-08-26T00:00:00" },
    { name: "日文N2检定", targetDate: "2025-12-01T00:00:00" },
    { name: "日文N1检定", targetDate: "2026-12-01T00:00:00" },
    { name: "托福考试", targetDate: "2026-07-07T00:00:00" },
    { name: "EJU", targetDate: "2027-06-01T00:00:00" }
];

const wrapper = document.getElementById('events-wrapper');

// 初始化：遍历数组，为每个事件生成基础的 HTML 结构
events.forEach((event, index) => {
    const eventDiv = document.createElement('div');
    eventDiv.className = 'event-item';
    
    // 提取日期部分用于静态显示 (如 2025-08-26)
    const displayDate = event.targetDate.split('T')[0];

    // 注入基础结构，预留动态更新的容器 id
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

// 核心引擎：计算并更新剩余时间
function updateTimers() {
    const now = new Date().getTime();

    events.forEach((event, index) => {
        const targetTime = new Date(event.targetDate).getTime();
        const timeRemaining = targetTime - now;
        const timerContainer = document.getElementById(`timer-${index}`);

        // 状态拦截：如果时间已经过了，显示已结束状态
        if (timeRemaining <= 0) {
            timerContainer.innerHTML = '<div class="completed">已结束 / Event Concluded</div>';
            timerContainer.style.display = 'block'; 
            return;
        }

        // 数学计算：毫秒转换
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        // 格式化对齐：补全前导零
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        // 视图更新
        timerContainer.innerHTML = `
            <div class="time-box">
                <div class="time-value">${days}</div>
                <div class="time-label">Days</div>
            </div>
            <div class="time-box">
                <div class="time-value">${formattedHours}</div>
                <div class="time-label">Hours</div>
            </div>
            <div class="time-box">
                <div class="time-value">${formattedMinutes}</div>
                <div class="time-label">Mins</div>
            </div>
            <div class="time-box">
                <div class="time-value">${formattedSeconds}</div>
                <div class="time-label">Secs</div>
            </div>
        `;
    });
}

// 首次执行，避免页面加载时出现内容空白闪烁
updateTimers();

// 启动循环：每 1000 毫秒（1秒）刷新一次
setInterval(updateTimers, 1000);