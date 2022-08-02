<template>
  <section class="wapper" v-if="scenario">
    <!-- 戻るボタン -->
    <section>
      <router-link
        :to="{
          name: 'table',
          params: { name: name },
        }"
      >
        <button class="backBtn" @click="reset">&laquo;</button>
      </router-link>
    </section>

    <!-- メイン部 -->
    <section class="main">
      <!-- スライドエリア -->
      <section class="slideArea" v-if="!showQuestion">
        <!-- <div>{{ name }}:{{ id }}<</div> -->
        <img :src="setImg" alt="dd" class="slide" />
      </section>
      <!-- 選択問題 -->
      <section class="question" v-if="showQuestion">
        <div class="label">問題</div>
        <!-- <div>{{ scenario[slideIndex] }}</div> -->
        <div>{{ scenario[slideIndex].title }}</div>
        <div>{{ scenario[slideIndex].question.question }}</div>
        <section class="choice">
          <template
            v-for="(choice, index) in scenario[slideIndex].question.choice"
            :key="index"
          >
            <div class="btn">
              <div
                @click="makeChoice(index)"
                class="choicebtn"
                :class="{ choiced: choice.choiced }"
              >
                <span
                  class="correct"
                  v-show="
                    showAnswer &&
                    index == scenario[slideIndex].question.answer.num
                  "
                  >✔</span
                >
                <span
                  class="wrong"
                  v-show="
                    showAnswer &&
                    index != scenario[slideIndex].question.answer.num
                  "
                  >&times;</span
                >
                {{ choice.text }}
              </div>
            </div>
          </template>
        </section>
      </section>

      <!-- メッセージエリア -->
      <section class="messageArea">
        <section class="btnArea">
          <!-- ボイス -->
          <button
            class="menuBtn"
            :class="talkVoice ? 'btnOn' : 'btnOff'"
            @click="isVoice"
          >
            ボイス
          </button>
          <!-- 音声テスト -->
          <button @click="voicePlay" class="repeat" :disabled="!talkVoice">
            再生▶
          </button>
          <!-- オートスキップ -->
          <button
            class="menuBtn"
            :class="autoskip ? 'btnOn' : 'btnOff'"
            @click="isSkip"
          >
            オートスキップ
          </button>
        </section>

        <!-- メッセージウィンドウ -->
        <div class="messageWindow" @click="nextMessage">
          <!-- キャラ画像 -->
          <img :src="require('@/assets/actor/' + actor)" class="actor" />
          <!-- メッセージ -->
          <div class="messageText" v-if="scenario">
            {{ scenario[slideIndex].message[messageIndex].text }}
          </div>
        </div>
      </section>
    </section>

    <!-- もくじ -->
    <div class="index">
      <!-- <div v-if="scenario">json:{{ scenario }}</div> -->
      <button @click="isMenu">&equiv;</button>
      <ul v-show="showMenu">
        <li
          v-for="(s, index) in scenario"
          :key="index"
          :class="{ active: slideIndex == index }"
          @click="jampSlide(index)"
        >
          {{ s.title }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: "LectureView",
  components: {},
  data() {
    return {
      // ページのパス
      name: this.$route.params.name,
      id: this.$route.params.id,
      actor: "Tsumugi-01.png", // アクター
      // 表示制御
      slideIndex: 0, //表示スライド番号
      slideImg: "", //表示スライド画像
      messageIndex: 0, //表示メッセージ番号
      messageVoice: new Audio(""), //表示メッセージ音声
      showActor: true, //キャラ表示
      showMenu: true, //もくじ表示
      showQuestion: false, // 選択問題の時
      skipable: true, //スキップ可/不可
      talkVoice: true, // 音声再生
      autoskip: false, //オートスキップ
      showAnswer: false, //正解と解説の表示
    };
  },
  methods: {
    // 戻る際にリセット
    reset() {
      this.messageVoice.pause();
      this.slideIndex = 0;
      this.messageIndex = 0;
    },

    // 進む
    nextMessage() {
      // 状態確認
      const slideLength = this.scenario.length;
      const messageLength = this.scenario[this.slideIndex].message.length;
      // console.log(
      //   "スライド:",
      //   this.slideIndex + 1 + "/" + slideLength,
      //   "メッセージ:",
      //   this.messageIndex + 1 + "/" + messageLength
      // );

      // 選択問題の時は停止
      if (!this.skipable) {
        return;
      }

      // 最後だったら停止
      if (this.messageIndex + 1 == messageLength) {
        if (this.slideIndex + 1 == slideLength) {
          console.log("終了");
          return;
        }
        // 次のスライドの最初のメッセージ
        this.slideIndex++;
        this.messageIndex = 0;
        this.isQuestion();
        this.setSlide();
      } else {
        // 次のメッセージ
        this.messageIndex++;
      }
      // 音声再生
      if (this.talkVoice) {
        this.voicePlay();
      }
    },

    // 音声の再生
    voicePlay() {
      this.messageVoice.pause();
      const voice =
        this.scenario[this.slideIndex].message[this.messageIndex].voice;
      if (voice) {
        this.messageVoice = new Audio(
          require("@/assets/" + this.name + "/" + this.id + "/voice/" + voice)
        );
        this.messageVoice.play();
        // 音声終了後のオートスキップ
        this.messageVoice.addEventListener("ended", () => {
          if (this.autoskip) {
            this.nextMessage();
          }
        });
      }
    },

    // 選択問題
    // 問題かどうかチェック
    isQuestion() {
      if (this.scenario[this.slideIndex].question && this.messageIndex == 0) {
        for (const i of this.scenario[this.slideIndex].question.choice) {
          i.choiced = false;
        }
        this.showQuestion = true;
        this.showAnswer = false;
        this.skipable = false;
      } else {
        this.skipable = true;
        this.showQuestion = false;
      }
      console.log("showQuestion:" + this.showQuestion);
    },

    // 正誤判定
    makeChoice(index) {
      // 回答後は停止
      if (this.skipable) {
        return;
      }
      this.messageVoice.pause();

      this.scenario[this.slideIndex].question.choice[index].choiced = true;
      // 正解の時
      if (index == this.scenario[this.slideIndex].question.answer.num) {
        this.skipable = true;
        this.showAnswer = true;
        this.messageVoice = new Audio(require("@/assets/voice/せーかい.mp3"));
        this.messageVoice.play();
        this.messageVoice.addEventListener("ended", () => {
          this.messageIndex++;
          this.voicePlay();
        });
      }
      // はずれの時
      else {
        this.messageVoice = new Audio(
          require("@/assets//voice/はっずれー.mp3")
        );
        this.messageVoice.play();
      }
    },

    //スライドのセット
    setSlide() {
      try {
        this.slideImg = this.scenario[this.slideIndex].slide;
        return this.slideImg;
      } catch {
        return { mes: "制作中です" };
      }
    },

    // ボイス切り替え
    isVoice() {
      this.talkVoice = !this.talkVoice;
      if (!this.talkVoice) {
        this.autoskip = false;
      }
    },

    // オートスキップ切り替え
    isSkip() {
      this.autoskip = !this.autoskip;
      if (this.autoskip) {
        this.talkVoice = true;
      }
    },

    // サイドメニューの表示
    isMenu() {
      this.showMenu = !this.showMenu;
    },

    // サイドメニューでスライドジャンプ
    jampSlide(index) {
      this.slideIndex = index;
      this.messageIndex = 0;
      this.isQuestion();
      this.setSlide();
      this.voicePlay();
    },
  },
  // mounted() {
  //   // this.setSlide();
  // },

  computed: {
    // シナリオデータの読み込み
    scenario() {
      try {
        return this.$store.getters.getScenario(this.name, this.id);
      } catch {
        return { mes: "制作中です" };
      }
    },

    // スライドの読み込み
    setImg() {
      try {
        const imgSrc = this.scenario[this.slideIndex].slide;
        return require("@/assets/" +
          this.name +
          "/" +
          this.id +
          "/img/" +
          imgSrc);
      } catch {
        return { mes: "制作中です" };
      }
    },
  },
};
</script>

<style scoped>
/* 背景 */
.wapper {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-image: url(@/assets/background/classroom.jpg);
  background-size: cover;
  background-position: center;
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1rem;
  /* user-select: none; */
}

/* 左エリア */
.backBtn {
  margin: 0.5rem;
  font-size: x-large;
}

/* メインエリア */
.main {
  box-sizing: border-box;
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  gap: 0.5rem;
}

/* スライド */
.slideArea {
  margin: auto auto 0;
}
.slide {
  max-width: 100%;
  max-height: calc(100vh - 250px);
}

/* 選択問題エリア */
.question {
  margin: auto;
  padding: 1rem;
  background-color: darkslategray;
  border-radius: 10px;
  font-size: x-large;
  color: white;
}
.question .label {
  width: fit-content;
  padding: 0 0.5rem;
  background: darkred;
  border-radius: 5px;
}

.question .choice {
  display: grid;
  gap: 0.5rem;
  margin-top: 1rem;
}

.choicebtn {
  padding: 0.5rem;
  cursor: pointer;
  background: antiquewhite;
  border: solid bisque;
  border-bottom: 0.4rem solid rgb(247, 210, 162);
  border-radius: 10px;
  color: black;
}

.choicebtn:hover {
  margin-top: 0.2rem;
  border-bottom: 0.2rem solid rgb(247, 210, 162);
  transition: 0.2s;
}

.choiced {
  margin-top: 0.2rem;
  background-color: gray;
  border: solid rgb(161, 137, 108);
  border-bottom: 0.2rem solid rgb(128, 108, 84);
}

.choiced:hover {
  border-bottom: 0.2rem solid rgb(128, 108, 84);
}

.correct {
  color: aquamarine;
}

.wrong {
  color: crimson;
}

/* メッセージエリア */
.messageArea {
  margin: auto 0 1rem;
}

.btnArea {
  text-align: end;
}
.messageWindow {
  box-sizing: border-box;
  /* height: 170px; */
  background-color: rgb(0, 0, 0, 0.8);
  border-radius: 10px;
  display: flex;
  color: white;
  font-size: x-large;
  cursor: pointer;
}

.actor {
  margin: auto;
  padding: 0.2rem;
  height: 95%;
  max-height: 170px;
}

/* 操作ボタン */
.menuBtn {
  margin-left: 0.2rem;
  border: solid darkcyan;
  border-radius: 10px;
  font-weight: bold;
}

.btnOn {
  background-color: aquamarine;
}

.btnOff {
  background-color: gray;
  opacity: 0.8;
}

.repeat {
  margin-left: 0.2rem;
  font-weight: bold;
  border: solid darkcyan;
  border-radius: 10px;
}

/* メッセージ */
.messageText {
  flex: 1;
  padding: 0.7rem 1rem;
  white-space: pre-line;
  overflow: auto;
}
.messageText::after {
  content: "▼";
  animation: blink 1s ease-in-out infinite alternate;
}

@keyframes blink {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

/* 右：目次エリア */
.index {
  margin: 0.5rem;
}

.index button {
  display: block;
  margin-left: auto;
  font-size: x-large;
}

.index ul {
  margin-top: 0;
  width: max-content;
  max-height: 85vh;
  overflow: auto;
  background: whitesmoke;
  padding: 0.5rem;
  border-radius: 10px 0 10px 10px;
  box-shadow: 2px 2px 4px;
  list-style: none;
  font-size: larger;
}

.index ul li {
  border-radius: 5px;
  padding: 0 0.2rem;
  cursor: pointer;
  border-bottom: solid gainsboro;
}

.index ul .active {
  background: aquamarine;
}
</style>
