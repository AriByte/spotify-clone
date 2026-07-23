console.log('script.js loaded successfully');

/* ============================================================
   SIMPLE VALIDATION - Email & Phone only, no password
   (Ye block sabse pehle rakha hai taaki jQuery na hone par bhi
   ye hamesha chale, chahe niche ka player code fail ho jaaye)
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const PHONE_REGEX = /^[6-9]\d{9}$/;

    function showToast(message) {
        const toast = document.getElementById('formToast');
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
    }

    function showError(inputEl, errorEl, message) {
        inputEl.classList.remove('input-error');
        void inputEl.offsetWidth;
        inputEl.classList.add('input-error');
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.style.display = 'block';
        }
    }

    function clearError(inputEl, errorEl) {
        inputEl.classList.remove('input-error');
        if (errorEl) {
            errorEl.textContent = '';
            errorEl.style.display = 'none';
        }
    }

    function handleEmailForm(formId, inputId, errorId) {
        const form = document.getElementById(formId);
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const input = document.getElementById(inputId);
            const error = document.getElementById(errorId);
            const value = input.value.trim();

            if (value === '' || !EMAIL_REGEX.test(value)) {
                showError(input, error, 'Please enter a valid email address.');
                showToast('Please enter a valid email address');
                return;
            }

            clearError(input, error);
            window.location.href = 'loggedindex.html';
        });
    }

    function handlePhoneForm(formId, inputId, errorId) {
        const form = document.getElementById(formId);
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const input = document.getElementById(inputId);
            const error = document.getElementById(errorId);
            const value = input.value.trim();

            if (!PHONE_REGEX.test(value)) {
                showError(input, error, 'Please enter a valid 10-digit mobile number.');
                showToast('Please enter a valid 10-digit mobile number');
                return;
            }

            clearError(input, error);
            window.location.href = 'loggedindex.html';
        });
    }

    handleEmailForm('loginEmailForm', 'loginEmailInput', 'loginEmailError');
    handlePhoneForm('loginPhoneForm', 'loginPhoneInput', 'loginPhoneError');
    handleEmailForm('signupEmailForm', 'signupEmailInput', 'signupEmailError');
    handlePhoneForm('signupPhoneForm', 'signupPhoneInput', 'signupPhoneError');

});


/* ============================================================
   MUSIC PLAYER (jQuery-based) — sirf tab chalega jab jQuery
   available hai, warna safely skip ho jaayega
   ============================================================ */

if (typeof $ !== 'undefined') {

    // Master Playlist
    const songs = [
        {
            title: "Toh Phir Aao",
            artist: "Pritam, Mustafa Zahid, Sayeed Quadri",
            src: "songs/Trending/to_phir_aao.mp3",
            cover: "covers/songs_cover/to_phir_aao.png"
        },
        {
            title: "Arz Kia Hai",
            artist: "Anuv Jain",
            src: "songs/Trending/arz_kia_hai.mp3",
            cover: "covers/songs_cover/arz_kia_hai.png"
        },
        {
            title: "Saree",
            artist: "Tanishk Bagchi, Sanju Rathod",
            src: "songs/Trending/saree.mp3",
            cover: "covers/songs_cover/saree.png"
        },
        {
            title: "Aarzu",
            artist: "Asim Azhar, Noor, Khan",
            src: "songs/Trending/aarzu.mp3",
            cover: "covers/songs_cover/aarzu.png"
        },
        {
            title: "Ban Ja Tu",
            artist: "Charan Preet, Badshah",
            src: "songs/Trending/ban_ja_tu.mp3",
            cover: "covers/songs_cover/banja_tu.png"
        },
        {
            title: "Low Fade",
            artist: "Karan Aujla, Mxrci",
            src: "songs/Trending/low_fade.mp3",
            cover: "covers/songs_cover/low_fade.png"
        },
        {
            title: "KALYANI (with Shreya Ghoshal) - Remix",
            artist: "ARJN, KDS, FIFTY4, Shreya Ghoshal",
            src: "songs/Trending/trendingshowall_songs/kalyani.mp3",
            cover: "covers/songs_cover/trendingshowall/kalyani.png"
        },
        {
            title: "Taare",
            artist: "Farak, 10A, Saswat Balan",
            src: "songs/Trending/trendingshowall_songs/taare.mp3",
            cover: "covers/songs_cover/trendingshowall/taare.png"
        },
        {
            title: "Jamaican (Bam Bam)",
            artist: "HUGEL, SOLTO (FR)",
            src: "songs/Trending/trendingshowall_songs/jamaican_bam_bam.mp3",
            cover: "covers/songs_cover/trendingshowall/jamaican_bam_bam.png"
        },
        {
            title: "LAAVAN",
            artist: "Jasmine Sandlas, Mofusion",
            src: "songs/Trending/trendingshowall_songs/laavan.mp3",
            cover: "covers/songs_cover/trendingshowall/laavan.png"
        },
        {
            title: "Big Plans",
            artist: "Dhanda Nyoliwala, Romeoz",
            src: "songs/Trending/trendingshowall_songs/big_plans.mp3",
            cover: "covers/songs_cover/trendingshowall/big_plans.png"
        },
        {
            title: "Sohniye",
            artist: "Shubh",
            src: "songs/Trending/trendingshowall_songs/sohniye.mp3",
            cover: "covers/songs_cover/trendingshowall/sohniye.png"
        },
        {
            title: "Ve Junoon",
            artist: "Artist Name",
            src: "songs/Trending/trendingshowall_songs/ve_junoon.mp3",
            cover: "covers/songs_cover/trendingshowall/ve_junoon.png"
        },
        {
            title: "Rehna Hai Tere Dil Mein",
            artist: "Artist Name",
            src: "songs/Trending/trendingshowall_songs/rhtdm.mp3",
            cover: "covers/songs_cover/trendingshowall/rhtdm.png"
        },
        {
            title: "Narak",
            artist: "Artist Name",
            src: "songs/Trending/trendingshowall_songs/narak.mp3",
            cover: "covers/songs_cover/trendingshowall/narak.png"
        },
        {
            title: "Freaked Out",
            artist: "Artist Name",
            src: "songs/Trending/trendingshowall_songs/freaked_out.mp3",
            cover: "covers/songs_cover/trendingshowall/freaked_out.png"
        },
        {
            title: "Love on Repeat",
            artist: "Artist Name",
            src: "songs/Trending/trendingshowall_songs/love_on_repeat.mp3",
            cover: "covers/songs_cover/trendingshowall/love_on_repeat.png"
        },
        {
            title: "Tum Ho Toh",
            artist: "Artist Name",
            src: "songs/Trending/trendingshowall_songs/tum_ho_toh.mp3",
            cover: "covers/songs_cover/trendingshowall/tum_ho_toh.png"
        },
        {
            title: "Saiyaara",
            artist: "Artist Name",
            src: "songs/Trending/trendingshowall_songs/saiyaara.mp3",
            cover: "covers/songs_cover/trendingshowall/saiyaara.png"
        },
        {
            title: "God's Favourite",
            artist: "Artist Name",
            src: "songs/Trending/trendingshowall_songs/gods_favourite.mp3",
            cover: "covers/songs_cover/trendingshowall/gods_favourite.png"
        },
        {
            title: "Tujhko - From \"Cocktail 2\"",
            artist: "Pritam, Arijit Singh, Sunidhi Chauhan, Amitabh Bhattacharya",
            src: "songs/Artists/pritam_folder/tujhko.mp3",
            cover: "covers/artists_cover/pritam_folder/tujhko.jpg"
        },
        {
            title: "Mashooqa - From \"Cocktail 2\"",
            artist: "Pritam, Mahmood, Raghav Chaitanya, Amitabh Bhattacharya, Ruaa Kayy",
            src: "songs/Artists/pritam_folder/mashooqa.mp3",
            cover: "covers/artists_cover/pritam_folder/mashooqa.jpg"
        },
        {
            title: "Ye Tune Kya Kiya",
            artist: "Pritam, Javed Bashir, Rajat Arora",
            src: "songs/Artists/pritam_folder/ye_tune_kya_kiya.mp3",
            cover: "covers/artists_cover/pritam_folder/ye_tune_kya_kiya.jpg"
        },
        {
            title: "Bandhu 2.0 (From \"Cocktail 2\")",
            artist: "Pritam, Kavita Seth, Neeraj Shridhar, Irshad Kamil",
            src: "songs/Artists/pritam_folder/bandhu.mp3",
            cover: "covers/artists_cover/pritam_folder/bandhu.jpg"
        },
        {
            title: "Tum Se Hi",
            artist: "Pritam, Mohit Chauhan, Irshad Kamil",
            src: "songs/Artists/pritam_folder/tum_se_hi.mp3",
            cover: "covers/artists_cover/pritam_folder/tum_se_hi.jpg"
        },
        {
            title: "Agar Tum Saath Ho (From \"Tamasha\")",
            artist: "A.R. Rahman, Alka Yagnik, Arijit Singh",
            src: "songs/Artists/ar_rahman_folder/agar_tum_saath_ho.mp3",
            cover: "covers/artists_cover/ar_rahman_folder/agar_tum_saath_ho.jpg"
        },
        {
            title: "Deewaana Deewaana",
            artist: "A.R. Rahman, Irshad Kamil",
            src: "songs/Artists/ar_rahman_folder/deewana.mp3",
            cover: "covers/artists_cover/ar_rahman_folder/deewana.jpg"
        },
        {
            title: "Tere Bina",
            artist: "A.R. Rahman, Chinmayi, Murtuza Khan, Qadir Khan",
            src: "songs/Artists/ar_rahman_folder/tere_bina.mp3",
            cover: "covers/artists_cover/ar_rahman_folder/tere_bina.jpg"
        },
        {
            title: "Aawaara Angaara",
            artist: "A.R. Rahman, Faheem Abdullah, Irshad Kamil",
            src: "songs/Artists/ar_rahman_folder/aawaara.mp3",
            cover: "covers/artists_cover/ar_rahman_folder/aawaara.jpg"
        },
        {
            title: "Chikiri Chikiri (From \"Peddi\") [TELUGU]",
            artist: "A.R. Rahman, Mohit Chauhan, Balaji",
            src: "songs/Artists/ar_rahman_folder/chikiri.mp3",
            cover: "covers/artists_cover/ar_rahman_folder/chikiri.jpg"
        },
        {
            title: "Gehra Hua",
            artist: "Shashwat Sachdev, Arijit Singh, Irshad Kamil, Armaan Khan",
            src: "songs/Artists/arijit_folder/gehra_hua.mp3",
            cover: "covers/artists_cover/arijit_folder/gehra_hua.jpg"
        },
        {
            title: "Samjhawan",
            artist: "Jawad Ahmad, Shaarib Toshi, Arijit Singh, Shreya Ghoshal",
            src: "songs/Artists/arijit_folder/samjhawan.mp3",
            cover: "covers/artists_cover/arijit_folder/samjhawan.jpg"
        },
        {
            title: "Apna Bana Le",
            artist: "Sachin-Jigar, Arijit Singh, Amitabh Bhattacharya",
            src: "songs/Artists/arijit_folder/apna_bana_le.mp3",
            cover: "covers/artists_cover/arijit_folder/apna_bana_le.jpg"
        },
        {
            title: "Sitaare (From \"Ikkis\")",
            artist: "Arijit Singh, Sachin-Jigar, Amitabh Bhattacharya",
            src: "songs/Artists/arijit_folder/sitaare.mp3",
            cover: "covers/artists_cover/arijit_folder/sitaare.jpg"
        },
        {
            title: "Agar Tum Saath Ho (From \"Tamasha\")",
            artist: "Alka Yagnik, Arijit Singh",
            src: "songs/Artists/arijit_folder/agar_tum_sath_ho.mp3",
            cover: "covers/artists_cover/arijit_folder/agar_tum_sath_ho.jpg"
        },
        {
            title: "Apna Bana Le",
            artist: "Sachin-Jigar, Arijit Singh, Amitabh Bhattacharya",
            src: "songs/Artists/sachin_folder/apna_bana_le.mp3",
            cover: "covers/artists_cover/sachin_folder/apna_bana_le.jpg"
        },
        {
            title: "Sitaare (From \"Ikkis\")",
            artist: "Arijit Singh, Sachin-Jigar, Amitabh Bhattacharya",
            src: "songs/Artists/sachin_folder/sitaare.mp3",
            cover: "covers/artists_cover/sachin_folder/sitaare.jpg"
        },
        {
            title: "Jeena Jeena",
            artist: "Sachin-Jigar, Atif Aslam",
            src: "songs/Artists/sachin_folder/jeena.mp3",
            cover: "covers/artists_cover/sachin_folder/jeena.jpg"
        },
        {
            title: "Jeene Laga Hoon",
            artist: "Sachin-Jigar, Atif Aslam, Shreya Ghoshal",
            src: "songs/Artists/sachin_folder/jeene_laga_hu.mp3",
            cover: "covers/artists_cover/sachin_folder/jeene_laga_hu.jpg"
        },
        {
            title: "Saibo",
            artist: "Sachin-Jigar, Shreya Ghoshal, Tochi Raina",
            src: "songs/Artists/sachin_folder/saibo.mp3",
            cover: "covers/artists_cover/sachin_folder/saibo.jpg"
        },
        {
            title: "Ishq Bulaava",
            artist: "Vishal-Shekhar, Sanam Puri, Shipra Goyal",
            src: "songs/Artists/vishal_folder/ishq_bulawa.mp3",
            cover: "covers/artists_cover/vishal_folder/ishq_bulawa.jpg"
        },
        {
            title: "Khuda Jaane",
            artist: "Vishal-Shekhar, KK, Shilpa Rao, Anvita Dutt Guptan",
            src: "songs/Artists/vishal_folder/khuda_jaane.mp3",
            cover: "covers/artists_cover/vishal_folder/khuda_jaane.jpg"
        },
        {
            title: "Ishq Sufiyana (Male)",
            artist: "Vishal-Shekhar, Kamal Khan",
            src: "songs/Artists/vishal_folder/ishq_sufiyana.mp3",
            cover: "covers/artists_cover/vishal_folder/ishq_sufiyana.jpg"
        },
        {
            title: "Ajab Si",
            artist: "KK, Vishal-Shekhar, Vishal Dadlani",
            src: "songs/Artists/vishal_folder/ajab_si.mp3",
            cover: "covers/artists_cover/vishal_folder/ajab_si.jpg"
        },
        {
            title: "Chammak Challo",
            artist: "Vishal-Shekhar, Akon, Hamsika Iyer, Vishal Dadlani, Niranjan Iyengar",
            src: "songs/Artists/vishal_folder/chammak_challo.mp3",
            cover: "covers/artists_cover/vishal_folder/chammak_challo.jpg"
        },
        {
            title: "Tere Liye",
            artist: "Atif Aslam, Shreya Ghoshal, Sachin Gupta, Sameer Anjaan",
            src: "songs/Artists/atif_folder/tere_liye.mp3",
            cover: "covers/artists_cover/atif_folder/tere_liye.jpg"
        },
        {
            title: "Jeena Jeena",
            artist: "Sachin-Jigar, Atif Aslam",
            src: "songs/Artists/atif_folder/jeena.mp3",
            cover: "covers/artists_cover/atif_folder/jeena.jpg"
        },
        {
            title: "Jeene Laga Hoon",
            artist: "Sachin-Jigar, Atif Aslam, Shreya Ghoshal",
            src: "songs/Artists/atif_folder/jeene_laga_hu.mp3",
            cover: "covers/artists_cover/atif_folder/jeene_laga_hu.jpg"
        },
        {
            title: "Tu Jaane Na",
            artist: "Pritam, Atif Aslam",
            src: "songs/Artists/atif_folder/tu_jaane_na.mp3",
            cover: "covers/artists_cover/atif_folder/tu_jaane_na.jpg"
        },
        {
            title: "Tera Hone Laga Hoon",
            artist: "Pritam, Atif Aslam, Alisha Chinai",
            src: "songs/Artists/atif_folder/tera_hone_laga_hu.mp3",
            cover: "covers/artists_cover/atif_folder/tera_hone_laga_hu.jpg"
        }
    ];


    

    // Music Player State Variables
    let currentSongIndex = 0;
    const audio = new Audio();
    let isPlaying = false;

    let currentVolumeValue = 50;
    let isMuted = false;

    audio.volume = currentVolumeValue / 100;

    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        let mins = Math.floor(seconds / 60);
        let secs = Math.floor(seconds % 60);
        if (secs < 10) {
            secs = "0" + secs;
        }
        return mins + ":" + secs;
    }

    function loadSong(index) {
        const currentSong = songs[index];

        audio.src = currentSong.src;
        $("#coverImage").attr("src", currentSong.cover);
        $("#songTitle").text(currentSong.title);
        $("#artistName").text(currentSong.artist);

        $("#progressBar").val(0);
        $("#currentTime").text("0:00");
        $("#totalDuration").text("0:00");
    }

    function playCurrentSong() {
        audio.play();
        isPlaying = true;
        $("#playBtn").html('<i class="fa-solid fa-pause"></i>');
    }

    $(document).ready(function() {

        // signup - banner disappear
        $(document).ready(function () {

            const navigationEntry = performance.getEntriesByType("navigation")[0];
            const isReload = navigationEntry && navigationEntry.type === "reload";
            const cameFromLogin = document.referrer.includes("login.html");

            if (isReload) {
                $(".preview-banner").show();
            } else if (cameFromLogin) {
                $(".preview-banner").hide();
            }
        });

        loadSong(currentSongIndex);
        $("#volumeSlider").val(currentVolumeValue);

        $(".spotify-card, .track-row").click(function() {
            let selectedIndex = parseInt($(this).attr("data-index"));
            loadSong(selectedIndex);
            currentSongIndex = selectedIndex;
            playCurrentSong();
        });

        $("#playBtn").click(function() {
            if (isPlaying) {
                audio.pause();
                isPlaying = false;
                $(this).html('<i class="fa-solid fa-play"></i>');
            } else {
                audio.play();
                isPlaying = true;
                $(this).html('<i class="fa-solid fa-pause"></i>');
            }
        });

        $("#nextBtn").click(function() {
            currentSongIndex++;
            if (currentSongIndex >= songs.length) {
                currentSongIndex = 0;
            }
            loadSong(currentSongIndex);
            playCurrentSong();
        });

        $("#prevBtn").click(function() {
            currentSongIndex--;
            if (currentSongIndex < 0) {
                currentSongIndex = songs.length - 1;
            }
            loadSong(currentSongIndex);
            playCurrentSong();
        });

        audio.addEventListener('ended', function() {
            $("#nextBtn").click();
        });

        audio.addEventListener('loadedmetadata', function() {
            $("#progressBar").attr("max", audio.duration);
            $("#totalDuration").text(formatTime(audio.duration));
        });

        audio.addEventListener('timeupdate', function() {
            $("#progressBar").val(audio.currentTime);
            $("#currentTime").text(formatTime(audio.currentTime));
        });

        $("#progressBar").on('input', function() {
            let seekToValue = parseFloat($(this).val());
            audio.currentTime = seekToValue;
        });

        $("#volumeSlider").on('input', function() {
            currentVolumeValue = parseInt($(this).val());

            if (currentVolumeValue > 0) {
                isMuted = false;
                $(".player-right i").removeClass("fa-volume-xmark").addClass("fa-volume-high");
            } else {
                isMuted = true;
                $(".player-right i").removeClass("fa-volume-high").addClass("fa-volume-xmark");
            }

            audio.volume = currentVolumeValue / 100;
        });

        $(".player-right i").click(function() {
            if (isMuted) {
                audio.volume = currentVolumeValue / 100;
                $("#volumeSlider").val(currentVolumeValue);
                isMuted = false;
                $(this).removeClass("fa-volume-xmark").addClass("fa-volume-high");
            } else {
                audio.volume = 0;
                $("#volumeSlider").val(0);
                isMuted = true;
                $(this).removeClass("fa-volume-high").addClass("fa-volume-xmark");
            }
        });

        // ===== SEARCH FUNCTIONALITY (Songs only) =====

        $("#searchInput").on('input', function () {
            const query = $(this).val().trim().toLowerCase();

            const homeContent = $("#homeContent");
            const resultsSection = $("#searchResultsSection");
            const resultsGrid = $("#searchResultsGrid");
            const resultsHeading = $("#searchResultsHeading");

            // Agar search box khaali hai, wapas normal home dikhao
            if (query === "") {
                homeContent.show();
                resultsSection.hide();
                resultsGrid.empty();
                return;
            }

            // Home content chhupao, results section dikhao
            homeContent.hide();
            resultsSection.show();

            // Filter: sirf un songs jinka title query se START hota hai
            const matchedSongs = [];
            const seenTitles = new Set(); // duplicate titles hatane ke liye

            songs.forEach(function (song, index) {
                const titleLower = song.title.toLowerCase();
                if (titleLower.startsWith(query) && !seenTitles.has(titleLower)) {
                    matchedSongs.push({ ...song, originalIndex: index });
                    seenTitles.add(titleLower);
                }
            });

            resultsGrid.empty();

            if (matchedSongs.length === 0) {
                resultsHeading.text('Search results for "' + $(this).val() + '"');
                resultsGrid.html('<p class="no-results-message">No matching songs</p>');
                return;
            }

            resultsHeading.text('Search results for "' + $(this).val() + '"');

            matchedSongs.forEach(function (song) {
                const cardHTML = `
                    <div class="shelf-item">
                        <div class="spotify-card" data-index="${song.originalIndex}">
                            <div class="card-img-container">
                                <img src="${song.cover}" alt="${song.title}">
                                <button class="hover-play-btn"><i class="fa-solid fa-play"></i></button>
                            </div>
                            <h6>${song.title}</h6>
                            <p>${song.artist}</p>
                        </div>
                    </div>
                `;
                resultsGrid.append(cardHTML);
            });

            // Naye cards pe click-to-play bhi kaam kare, isliye listener dobara attach karo
            $("#searchResultsGrid .spotify-card").off('click').on('click', function () {
                let selectedIndex = parseInt($(this).attr("data-index"));
                loadSong(selectedIndex);
                currentSongIndex = selectedIndex;
                playCurrentSong();
            });
        });

    });

} else {
    console.log('jQuery not loaded on this page — music player skipped.');
}