// Thư viện ảnh học tập. Danh mục được sinh từ tools/build_image_notes.py.
var notesState = {
  collectionId: null,
  page: 0,
  zoom: 100,
  viewMode: "width",
  query: ""
};

function getNoteCollections() {
  return window.IMAGE_NOTE_COLLECTIONS || [];
}

function normaliseNoteText(value) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function noteImageUrl(path) {
  return encodeURI(path).replace(/#/g, "%23");
}

function getNoteProgress() {
  try {
    return JSON.parse(localStorage.getItem("ontap.imageNotes.progress")) || {};
  } catch (e) {
    return {};
  }
}

function saveNoteProgress(collectionId, page) {
  var progress = getNoteProgress();
  var old = progress[collectionId] || {};
  progress[collectionId] = {
    lastPage: page,
    maxPage: Math.max(old.maxPage || 0, page),
    updatedAt: Date.now()
  };
  try {
    localStorage.setItem("ontap.imageNotes.progress", JSON.stringify(progress));
  } catch (e) {}
}

function syncNoteStateFromHash(collections) {
  var query = location.hash.split("?")[1] || "";
  if (!query) {
    notesState.collectionId = null;
    return;
  }
  var params = new URLSearchParams(query);
  var requestedId = params.get("collection");
  var collection = collections.find(function (item) { return item.id === requestedId; });
  if (!collection) {
    notesState.collectionId = null;
    return;
  }
  if (notesState.collectionId !== collection.id) {
    notesState.zoom = 100;
    notesState.viewMode = "width";
  }
  notesState.collectionId = collection.id;
  var requestedPage = Number(params.get("page"));
  notesState.page = Number.isFinite(requestedPage)
    ? Math.max(0, Math.min(requestedPage, collection.images.length - 1))
    : 0;
}

function renderNotes(el) {
  var collections = getNoteCollections();
  syncNoteStateFromHash(collections);
  var active = collections.find(function (item) { return item.id === notesState.collectionId; });
  if (active) renderNoteReader(el, active);
  else renderNoteLibrary(el, collections);
}

function renderNoteLibrary(el, collections) {
  var progress = getNoteProgress();
  var totalPages = collections.reduce(function (sum, item) { return sum + item.images.length; }, 0);
  var cards = collections.map(function (item) {
    var saved = progress[item.id];
    var reached = saved ? Math.min((saved.maxPage || 0) + 1, item.images.length) : 0;
    var status = reached ? "Đã tới trang " + reached + "/" + item.images.length : "Chưa bắt đầu";
    var search = normaliseNoteText(item.title + " " + (item.description || "") + " " + item.folder);
    return '<button class="note-collection" type="button" data-note-id="' + esc(item.id) +
      '" data-note-search="' + esc(search) + '">' +
      '<span class="note-cover"><img src="' + esc(noteImageUrl(item.cover)) +
      '" alt="Ảnh bìa bộ ' + esc(item.title) + '" loading="lazy"></span>' +
      '<span class="note-collection-copy"><span class="note-page-count">' + item.images.length +
      ' trang</span><strong>' + esc(item.title) + '</strong><span class="note-description">' +
      esc(item.description || "Bộ ghi chú hình ảnh.") + '</span><span class="note-progress-text">' +
      esc(status) + '</span></span></button>';
  }).join("");

  el.innerHTML =
    '<h1>🗂️ Tài liệu ảnh</h1>' +
    '<p class="subtitle">Đọc các bộ ghi chú đã lưu trên máy. Trang gần nhất được ghi nhớ trong trình duyệt.</p>' +
    '<div class="note-overview"><strong>' + collections.length + ' bộ tài liệu</strong><span>' +
    totalPages + ' trang ảnh</span></div>' +
    '<div class="note-library-toolbar"><label for="note-search">Tìm bộ tài liệu</label>' +
    '<input id="note-search" class="note-search" type="search" value="' + esc(notesState.query) +
    '" placeholder="Ví dụ: Java, SQL, System Design"></div>' +
    (cards ? '<div class="note-collection-grid" id="note-collection-grid">' + cards + '</div>' :
      '<div class="note-empty"><strong>Chưa có bộ tài liệu nào</strong><p>Thêm ảnh vào assets/notes hoặc assests/notes, sau đó chạy công cụ tạo danh mục.</p></div>') +
    '<div class="note-empty note-search-empty" id="note-search-empty" hidden><strong>Không tìm thấy bộ phù hợp</strong>' +
    '<p>Hãy thử một từ khóa ngắn hơn.</p></div>';

  var searchInput = el.querySelector("#note-search");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      notesState.query = searchInput.value;
      var query = normaliseNoteText(searchInput.value.trim());
      var visible = 0;
      el.querySelectorAll(".note-collection").forEach(function (card) {
        var matched = !query || card.dataset.noteSearch.indexOf(query) !== -1;
        card.hidden = !matched;
        if (matched) visible++;
      });
      var empty = el.querySelector("#note-search-empty");
      if (empty) empty.hidden = visible !== 0 || collections.length === 0;
    });
    searchInput.dispatchEvent(new Event("input"));
  }

  el.querySelectorAll(".note-collection").forEach(function (card) {
    card.addEventListener("click", function () {
      var collection = collections.find(function (item) { return item.id === card.dataset.noteId; });
      if (!collection) return;
      var saved = progress[collection.id];
      var page = Math.min(saved ? saved.lastPage || 0 : 0, collection.images.length - 1);
      notesState.zoom = 100;
      notesState.viewMode = "width";
      saveNoteProgress(collection.id, page);
      location.hash = "#/notes?collection=" + encodeURIComponent(collection.id) + "&page=" + page;
    });
  });
}

function renderNoteReader(el, collection) {
  if (!collection.images.length) {
    notesState.collectionId = null;
    renderNotes(el);
    return;
  }

  notesState.page = Math.max(0, Math.min(notesState.page, collection.images.length - 1));
  var page = notesState.page;
  var pageFit = notesState.viewMode === "page";
  var thumbs = collection.images.map(function (src, index) {
    return '<button class="note-thumb' + (index === page ? " active" : "") +
      '" type="button" data-note-page="' + index + '" aria-label="Mở trang ' + (index + 1) +
      '"' + (index === page ? ' aria-current="page"' : "") + '><img src="' +
      esc(noteImageUrl(src)) + '" alt="" loading="lazy"><span>Trang ' + (index + 1) + '</span></button>';
  }).join("");

  el.innerHTML =
    '<div class="note-reader-head">' +
    '<button class="btn secondary note-back" id="note-back" type="button">← Thư viện</button>' +
    '<div class="note-reader-title"><h1>' + esc(collection.title) + '</h1>' +
    '<p aria-live="polite">' + collection.images.length + ' trang | Đang xem trang ' + (page + 1) + '</p></div>' +
    '<div class="note-reader-actions">' +
    '<button class="btn secondary" id="note-prev" type="button"' + (page === 0 ? " disabled" : "") + '>← Trang trước</button>' +
    '<button class="btn secondary" id="note-next" type="button"' +
    (page === collection.images.length - 1 ? " disabled" : "") + '>Trang sau →</button>' +
    '<button class="btn secondary note-icon-btn note-zoom-control" id="note-zoom-out" type="button" aria-label="Thu nhỏ"' +
    (!pageFit && notesState.zoom <= 50 ? " disabled" : "") + '>−</button>' +
    '<span class="note-zoom-value note-zoom-control" aria-live="polite">' +
    (pageFit ? "Toàn trang" : notesState.zoom + "%") + '</span>' +
    '<button class="btn secondary note-icon-btn note-zoom-control" id="note-zoom-in" type="button" aria-label="Phóng to"' +
    (!pageFit && notesState.zoom >= 250 ? " disabled" : "") + '>+</button>' +
    '<button class="btn secondary note-view-btn' + (!pageFit ? " active" : "") +
    '" id="note-fit-width" type="button">Vừa chiều rộng</button>' +
    '<button class="btn secondary note-view-btn' + (pageFit ? " active" : "") +
    '" id="note-fit-page" type="button">Toàn trang</button>' +
    '<button class="btn secondary" id="note-fullscreen" type="button">Toàn màn hình</button>' +
    '</div></div>' +
    '<div class="note-reader-grid">' +
    '<aside class="note-thumbs" aria-label="Danh sách trang">' + thumbs + '</aside>' +
    '<section class="note-stage' + (pageFit ? " page-fit" : " width-fit") +
    '" id="note-stage" tabindex="0" aria-label="Trang tài liệu đang đọc">' +
    '<img class="note-main-image" id="note-main-image" src="' + esc(noteImageUrl(collection.images[page])) +
    '" alt="' + esc(collection.title) + ', trang ' + (page + 1) + '"' +
    (!pageFit ? ' style="width:' + notesState.zoom + '%"' : "") + '>' +
    '<p class="note-load-error">Không thể tải ảnh này. Hãy kiểm tra lại tên file trong thư mục.</p>' +
    '</section></div>' +
    '<p class="note-reader-hint">Ảnh mặc định vừa chiều rộng. Dùng phím mũi tên trái và phải để chuyển trang.</p>';

  el.querySelector("#note-back").addEventListener("click", function () {
    notesState.zoom = 100;
    notesState.viewMode = "width";
    location.hash = "#/notes";
  });
  el.querySelector("#note-prev").addEventListener("click", function () {
    setNotePage(el, collection, page - 1);
  });
  el.querySelector("#note-next").addEventListener("click", function () {
    setNotePage(el, collection, page + 1);
  });
  el.querySelector("#note-zoom-out").addEventListener("click", function () {
    notesState.viewMode = "width";
    notesState.zoom = Math.max(50, notesState.zoom - 25);
    renderNoteReader(el, collection);
  });
  el.querySelector("#note-zoom-in").addEventListener("click", function () {
    notesState.viewMode = "width";
    notesState.zoom = Math.min(250, notesState.zoom + 25);
    renderNoteReader(el, collection);
  });
  el.querySelector("#note-fit-width").addEventListener("click", function () {
    notesState.zoom = 100;
    notesState.viewMode = "width";
    renderNoteReader(el, collection);
  });
  el.querySelector("#note-fit-page").addEventListener("click", function () {
    notesState.viewMode = "page";
    renderNoteReader(el, collection);
  });
  el.querySelector("#note-fullscreen").addEventListener("click", function () {
    var stage = el.querySelector("#note-stage");
    if (stage && stage.requestFullscreen) stage.requestFullscreen().catch(function () {});
  });
  el.querySelectorAll(".note-thumb").forEach(function (thumb) {
    thumb.addEventListener("click", function () {
      setNotePage(el, collection, Number(thumb.dataset.notePage));
    });
  });

  var mainImage = el.querySelector("#note-main-image");
  mainImage.addEventListener("error", function () {
    el.querySelector("#note-stage").classList.add("has-error");
  });

  var activeThumb = el.querySelector(".note-thumb.active");
  if (activeThumb) setTimeout(function () {
    activeThumb.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, 0);

  if (collection.images[page + 1]) {
    var preload = new Image();
    preload.src = noteImageUrl(collection.images[page + 1]);
  }
}

function setNotePage(el, collection, page) {
  if (page < 0 || page >= collection.images.length) return;
  notesState.page = page;
  notesState.zoom = 100;
  notesState.viewMode = "width";
  saveNoteProgress(collection.id, page);
  history.replaceState(null, "", "#/notes?collection=" + encodeURIComponent(collection.id) + "&page=" + page);
  renderNoteReader(el, collection);
}

document.addEventListener("keydown", function (event) {
  if (event.defaultPrevented || event.ctrlKey || event.altKey || event.metaKey) return;
  var tag = (event.target.tagName || "").toLowerCase();
  if (tag === "input" || tag === "textarea" || tag === "select") return;
  if (typeof currentRoute !== "function" || currentRoute() !== "notes" || !notesState.collectionId) return;
  var collection = getNoteCollections().find(function (item) { return item.id === notesState.collectionId; });
  if (!collection) return;
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    setNotePage(document.getElementById("content"), collection, notesState.page - 1);
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    setNotePage(document.getElementById("content"), collection, notesState.page + 1);
  }
});
