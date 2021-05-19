<template>
  <div class="main_container">
    <h1 class="title">Vremenska prognoza</h1>
    <hr class="hr" />

    <div class="search">
      <input
        v-model="input"
        id="myInput"
        class="input"
        type="text"
        name="input"
        placeholder="Smederevo"
      />

      <button @click="getData()" class="btn_prikazi">
        Prikaži
      </button>
    </div>

    <div class="container">
      <div class="div1">
        <img :src="vreme" alt="" />
      </div>
      <div class="div2">
        <p class="p_2">Temperatura:</p>
        <p class="temperatura">{{ temperatura }} °C</p>
      </div>
      <div class="div3">
        <p>Oblačnost: {{ oblacnost }} %</p>
        <p>Pritisak vazduha: {{ pritisak_vazduha }} kPa</p>
        <p>Brzina vetra: {{ brzina_vetra }} m/s</p>
      </div>
      <div class="div4">
        <p class="grad">{{ grad }}</p>
        <p>{{ godina }}</p>
        <p v-bind="getMonth()">{{ mesec }}</p>
      </div>
    </div>
    <h1 class="vreme_sutra">Vreme sutra</h1>
    <hr class="hr" />
    <div class="daily_forecast">
      <div class="vreme1_container">
        <img class="vreme1" :src="vreme1" alt="" />
        <p>
          Min/Max <br />
          {{ min_temp }}° / {{ max_temp }}°
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import kisa from "./Kisa.png";
import sunce from "./Sunce.png";
import oblacno from "./Oblacno.png";
import sneg from "./Sneg.png";
import oluja from "./Oluja.png";

export default {
  data() {
    return {
      input: "Smederevo",
      temperatura: "",
      grad: "Smederevo",
      vreme: "",
      oblacnost: "",
      brzina_vetra: "",
      pritisak_vazduha: "",
      godina: new Date().getFullYear(),
      mesec: null,
      min_temp: "",
      max_temp: "",
      vreme1: "",
    };
  },
  methods: {
    getData() {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${this.input}&appid=6ee65708a9809409cae1f996b3c7a0a1`
        )
        .then((response) => {
          console.log(response);
          if (response.status >= 200 && response.status < 400) {
            let data = response.data;
            console.log("Data: " + data);
            this.temperatura = (data.main.temp - 273.15).toFixed(0);
            this.grad = this.input;
            let vreme = data.weather[0].main;
            let oblacnost = data.main.humidity;
            this.oblacnost = oblacnost;
            let brzina_vetra = data.wind.speed;
            this.brzina_vetra = brzina_vetra;
            let pritisak_vazduha = (data.main.pressure * 0.1).toFixed(0);
            this.pritisak_vazduha = pritisak_vazduha;
            let lat = data.coord.lat;
            let lon = data.coord.lon;
            console.log(lat);
            console.log(lon);
            console.log(vreme);
            if (vreme == "Rain") {
              this.vreme = kisa;
            }
            if (vreme == "Drizzle") {
              this.vreme = kisa;
            }
            if (vreme == "Clear") {
              this.vreme = sunce;
            }
            if (vreme == "Snow") {
              this.vreme = sneg;
            }
            if (vreme == "Clouds") {
              this.vreme = oblacno;
            }
            if (vreme == "Thunderstorm") {
              this.vreme = oluja;
            }
            axios
              .get(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts&appid=6ee65708a9809409cae1f996b3c7a0a1`
              )
              .then((resp) => {
                console.log(resp.data);

                this.min_temp = (resp.data.daily[0].temp.min - 273.15).toFixed(
                  0
                );
                this.max_temp = (resp.data.daily[0].temp.max - 273.15).toFixed(
                  0
                );
              });
            let vreme1 = data.weather[0].main;
            console.log("Vreme1 " + vreme1);
            if (vreme1 == "Rain") {
              this.vreme1 = kisa;
            }
            if (vreme1 == "Drizzle") {
              this.vreme1 = kisa;
            }
            if (vreme1 == "Clear") {
              this.vreme1 = sunce;
            }
            if (vreme1 == "Snow") {
              this.vreme1 = sneg;
            }
            if (vreme1 == "Clouds") {
              this.vreme1 = oblacno;
            }
            if (vreme1 == "Thunderstorm") {
              this.vreme1 = oluja;
            }
          }
        });
    },
    getMonth() {
      let mesec = new Date().getMonth() + 1;
      if (mesec == 1) {
        this.mesec = "Januar";
      }
      if (mesec == 2) {
        this.mesec = "Februar";
      }
      if (mesec == 3) {
        this.mesec = "Mart";
      }
      if (mesec == 4) {
        this.mesec = "April";
      }
      if (mesec == 5) {
        this.mesec = "Maj";
      }
      if (mesec == 6) {
        this.mesec = "Jun";
      }
      if (mesec == 7) {
        this.mesec = "Jul";
      }
      if (mesec == 8) {
        this.mesec = "Avgust";
      }
      if (mesec == 9) {
        this.mesec = "Septembar";
      }
      if (mesec == 10) {
        this.mesec = "Oktobar";
      }
      if (mesec == 11) {
        this.mesec = "Novembar";
      }
      if (mesec == 12) {
        this.mesec = "Decembar";
      }
    },
  },
};
</script>

<style scoped>
.vreme_sutra {
  font-family: "Roboto", sans-serif;
}
.vreme1 {
  margin-left: -10px;
  width: 100px;
}
.daily_forecast {
  margin-top: 50px;
  text-align: center;
  padding: 10px;
  width: 10%;
  background-color: rgb(224, 224, 224);
  font-family: "Roboto", sans-serif;
}
.title {
  font-size: 40px;
  font-family: "Roboto", sans-serif;
  color: #0e0e0e;
}
.main_container {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 40%;
  padding-bottom: 100px;
  margin: auto;
  box-shadow: 1px 1px 1px 1px rgba(255, 255, 255, 0.815);
}

.search {
  display: flex;
  gap: 15px;
  margin-top: 150px;
}
.input {
  padding: 10px;
  width: 70%;
  border: transparent;
  background-color: #f9f9f9;
  font-family: "Roboto", sans-serif;
  font-size: 15px;
  outline: 1px rgb(240, 240, 240) solid;
}

.input:focus {
  background-color: #f9f9f9;
  outline: 1px rgb(236, 236, 236) solid;
}

.btn_prikazi {
  width: 30%;
  background-color: #5dbcf4;
  border: transparent;
  color: white;
  font-family: "Roboto", sans-serif;
  font-size: 15px;
  cursor: pointer;
}

.btn_prikazi:hover {
  background-color: #39b5fd;
}

.container {
  width: 100%;
  margin: 100px auto;
  display: flex;
  justify-content: space-between;
  font-family: "Roboto", sans-serif;
}
.div1 {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: left;
}
.div1 img {
  width: 200px;
  margin-top: -50px;
  margin-left: -30px;
}
.div2 {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: left;
}
.div2 p {
  margin-top: 5px;
}

.temperatura {
  font-weight: bold;
  font-size: 42px;
  color: #0e0e0e;
}
.grad {
  font-weight: bold;
  font-size: 20px;
}

.div3 {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: left;
}

.div3 p {
  margin-top: 5px;
}

.div4 {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: left;
}
.div4 p {
  margin-top: 5px;
}

@media (max-width: 1700px) {
  .main_container {
    width: 60%;
  }
}
@media (max-width: 1200px) {
  .main_container {
    width: 80%;
  }
}
@media (max-width: 900px) {
  .main_container {
    width: 90%;
  }
}
@media (max-width: 800px) {
  .search {
    margin-top: 100px;
  }
  .vreme_sutra {
    margin-top: 10px;
  }
  .vreme1 {
    margin-left: 5px;
  }
  .daily_forecast {
    width: 15%;
  }
}

@media (max-width: 720px) {
  .main_container {
    top: 0%;
  }

  .vreme_sutra {
    font-family: "Roboto", sans-serif;
    font-size: 4vw;
  }
  .vreme1 {
    margin-left: 0px;
  }
  .daily_forecast {
    margin-top: 50px;
    text-align: center;
    padding: 10px;
    width: 20%;
    background-color: rgb(224, 224, 224);
    font-family: "Roboto", sans-serif;
  }
  .title {
    font-size: 6vw;
    font-family: "Roboto", sans-serif;
    color: #0e0e0e;
  }
  .search {
    display: flex;
    gap: 15px;
    margin-top: 100px;
  }
  .input {
    padding: 10px;
    width: 70%;

    font-size: 14px;
  }
  .btn_prikazi {
    font-size: 14px;
  }
  .div1 img {
    width: 150px;
    margin-top: -25px;
    margin-left: -25px;
  }
  .vreme_sutra {
    margin-top: -20px;
  }
  .temperatura {
    font-weight: bold;
    font-size: 4vw;
    color: #0e0e0e;
  }
  .container {
    width: 100%;
    margin: 100px auto;
    gap: 15px;
  }
  .p_2 {
    font-size: 2.5vw;
  }
  .div2 p {
    margin-top: 0px;
  }

  .div3 p {
    margin-top: 0px;
    font-size: 2.5vw;
  }

  .div4 p {
    margin-top: 0px;
    font-size: 2.5vw;
  }
}
@media (max-width: 500px) {
  .hr {
    display: none;
  }
  .search {
    gap: 5px;
    margin-top: 60px;
  }
  .input {
    width: 70%;
  }
  .title {
    text-align: center;
    margin-top: 30px;
    font-size: 8vw;
    background-color: rgb(221, 247, 255);
    padding: 10px;
  }
  .container {
    margin-top: 60px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
    align-items: flex-start;
  }
  .div1 img {
    margin-top: -35px;
    width: 180px;
  }
  .temperatura {
    font-size: 6vw;
  }
  .p_2 {
    font-size: 4vw;
  }
  .div3 p {
    font-size: 4vw;
    text-align: center;
  }
  .div4 p {
    font-size: 4vw;
  }
  .vreme_sutra {
    background-color: rgb(221, 247, 255);
    padding: 10px;
    font-size: 5vw;
  }
  .daily_forecast {
    width: 25%;
  }
  .vreme1 {
    margin-left: 0px;
  }
}

@media (max-width: 400px) {
  .daily_forecast {
    width: 25%;
  }
  .vreme1 {
    margin-left: -5px;
  }
}
@media (max-width: 350px) {
  @media (max-width: 400px) {
    .daily_forecast {
      width: 25%;
    }
    .vreme1 {
      margin-left: -13px;
    }
  }
}
</style>
