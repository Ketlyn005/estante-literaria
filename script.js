:root {
  --bg-dark: #120e0c;
  --card-bg: #221a16;
  --card-border: #362923;
  --input-bg: #1a1310;
  --text-main: #eae4dc;
  --text-muted: #a6988a;
  --accent-gold: #c89f68;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background-color: var(--bg-dark);
  color: var(--text-main);
  font-family: system-ui, -apple-system, sans-serif;
  min-height: 100vh;
  padding-bottom: 60px;
}

.hero-banner {
  height: 200px;
  background-image: linear-gradient(to bottom, rgba(18, 14, 12, 0.4), rgba(18, 14, 12, 0.95)), url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1000&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  margin-bottom: 20px;
}

.hero-subtitle { font-size: 0.75rem; letter-spacing: 2px; text-transform: uppercase; color: var(--accent-gold); font-weight: 600; }
.hero-title { font-family: Georgia, serif; font-size: 1.8rem; font-weight: 700; color: #fff; margin-top: 4px; }
.hero-description { font-size: 0.85rem; color: var(--text-muted); font-style: italic; margin-top: 4px; }

.container { max-width: 500px; margin: 0 auto; padding: 0 16px; }

.stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px; }
.stat-card { background: var(--card-bg); border: 1px solid var(--card-border); border-radius: 12px; padding: 12px; }
.stat-label { font-size: 0.75rem; color: var(--text-muted); }
.stat-value { font-size: 1.4rem; font-weight: 700; color: var(--text-main); margin-top: 4px; }

.metas-card { background: var(--card-bg); border: 1px solid var(--card-border); border-radius: 12px; padding: 14px; margin-bottom: 20px; }
.meta-item { margin-bottom: 10px; }
.meta-header { display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 4px; }

.filter-scroll { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 8px; margin-bottom: 16px; }
.filter-btn { background: var(--card-bg); border: 1px solid var(--card-border); color: var(--text-muted); padding: 8px 14px; border-radius: 20px; font-size: 0.8rem; white-space: nowrap; cursor: pointer; }
.filter-btn.active { background: var(--accent-gold); color: #120e0c; font-weight: 700; border-color: var(--accent-gold); }

.form-card { background-color: var(--card-bg); border: 1px solid var(--card-border); border-radius: 16px; padding: 18px; margin-bottom: 24px; }
.form-group { margin-bottom: 12px; }
.form-group label { display: block; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 6px; }
.input-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

input[type="text"], input[type="number"], select, input[type="file"] {
  width: 100%; background-color: var(--input-bg); border: 1px solid var(--card-border); border-radius: 8px; padding: 10px; color: var(--text-main); font-size: 0.85rem; outline: none;
}

input[type="file"]::file-selector-button {
  background: var(--card-border);
  color: var(--accent-gold);
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  margin-right: 8px;
}

button, input[type="button"] { cursor: pointer; touch-action: manipulation; }
.btn-submit { width: 100%; background-color: var(--accent-gold); color: #120e0c; border: none; border-radius: 8px; padding: 14px; font-weight: 700; font-size: 0.95rem; margin-top: 10px; display: block; text-align: center; }

.books-grid { display: flex; flex-direction: column; gap: 12px; }
.book-card { background-color: var(--card-bg); border: 1px solid var(--card-border); border-radius: 12px; padding: 12px; display: flex; gap: 12px; }
.book-cover { width: 60px; height: 90px; object-fit: cover; border-radius: 6px; background-color: var(--input-bg); flex-shrink: 0; }
.book-info { flex: 1; min-width: 0; }
.book-title-item { font-weight: 600; font-size: 0.95rem; margin-bottom: 2px; }
.book-author { font-size: 0.8rem; color: var(--text-muted); }
.book-genre { font-size: 0.7rem; color: var(--accent-gold); margin-bottom: 6px; }

.progress-bar { height: 6px; background-color: var(--input-bg); border-radius: 3px; overflow: hidden; margin: 6px 0; }
.progress-fill { height: 100%; background-color: var(--accent-gold); width: 0%; }

.book-actions { display: flex; gap: 8px; margin-top: 8px; }
.btn-action { background: var(--input-bg); border: 1px solid var(--card-border); color: var(--text-main); font-size: 0.75rem; padding: 8px 12px; border-radius: 6px; }
.btn-action.accent { border-color: var(--accent-gold); color: var(--accent-gold); }

.modal { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 999; padding: 20px; overflow-y: auto; align-items: center; justify-content: center; }
.modal.active { display: flex; }
.modal-content { background: var(--card-bg); border: 1px solid var(--card-border); border-radius: 16px; padding: 20px; width: 100%; max-width: 480px; position: relative; }
.close-modal { position: absolute; top: 12px; right: 16px; background: none; border: none; color: var(--text-muted); font-size: 1.6rem; }
