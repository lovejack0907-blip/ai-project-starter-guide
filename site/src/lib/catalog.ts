// Category presentation only. Article titles, summaries and counts always come from wiki/.
export const categories = [
  { id: '01-ai-development', name: 'AI 開發入門', short: 'AI 開發入門', description: '先認識 AI 能幫什麼忙，找到適合自己的起點。', icon: 'spark', tone: 'violet' },
  { id: '02-project-planning', name: '專案規劃與開發流程', short: '專案規劃', description: '把腦中的想法，變成清楚、做得到的小步驟。', icon: 'map', tone: 'peach' },
  { id: '03-ai-tools', name: 'AI 工具介紹與選擇', short: 'AI 工具', description: '了解不同工具的用途，選擇合適的開發夥伴。', icon: 'tools', tone: 'blue' },
  { id: '04-technical-basics', name: '程式與技術基礎', short: '技術基礎', description: '用容易理解的方式，認識專案裡的基本技術。', icon: 'code', tone: 'mint' },
  { id: '05-ai-collaboration', name: 'Prompt 與 AI 協作技巧', short: '與 AI 協作', description: '說清楚需求、給對背景，一起把成果做好。', icon: 'chat', tone: 'violet' },
  { id: '06-project-management', name: '開發環境與專案管理', short: '專案管理', description: '整理檔案與版本，讓每一次修改都有跡可循。', icon: 'folder', tone: 'peach' },
  { id: '07-debugging-testing', name: '測試與錯誤排除', short: '測試與修正', description: '學會檢查成果，遇到問題也知道如何往下走。', icon: 'check', tone: 'mint' },
  { id: '08-security-deployment', name: '安全、費用與部署', short: '安全與部署', description: '照顧好資料與使用條件，再把作品分享出去。', icon: 'shield', tone: 'blue' },
  { id: '09-examples-resources', name: '實作案例與實用資源', short: '實作與資源', description: '從小型練習出發，讓學到的知識有地方應用。', icon: 'book', tone: 'peach' },
] as const;
export const stages = [
  { title: '認識 AI 開發', description: '了解 AI 輔助開發的概念、能力與限制。', category: '01-ai-development' },
  { title: '規劃自己的專案', description: '整理需求、決定功能，規劃開發步驟。', category: '02-project-planning' },
  { title: '開始實際開發', description: '認識開發環境、專案檔案與 AI 協作方式。', category: '01-ai-development' },
  { title: '測試與修正', description: '學習測試功能、回報錯誤與改善成果。', category: '07-debugging-testing' },
  { title: '部署與分享', description: '認識部署、基本安全與作品發布。', category: '08-security-deployment' },
];
