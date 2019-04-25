<template>
  <div>
    <v-toolbar :color="toolbarColor" dark dense fixed app>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <!-- Performance dropdown -->
      <v-select
        v-model="activePerformance"
        :items="performances"
        item-text="title"
        label="[Vorstellung wählen...]"
        item-value="id"
        append-icon=""
        return-object
        single-line
        close-on-click
        @change="loadBookings"
      >

        <template slot="selection" slot-scope="myPerf">
          <v-toolbar-title class="performanceTitle text-xs-center"> {{ myPerf.item.title }} </v-toolbar-title>
          <v-toolbar-items class="performanceDate">
            <v-subheader> {{ moment(myPerf.item.date).format('dddd DD. MMM YYYY, H:mm[Uhr]') }} </v-subheader>
            <v-icon>arrow_drop_down</v-icon>
          </v-toolbar-items>
        </template>

        <template slot="item" slot-scope="mySel">
          <div :class="performanceListColor(mySel.item.date)">
            <span>
              <v-icon class="showIfPast">fast_rewind</v-icon>
              <v-icon class="showIfPresent">fiber_manual_record</v-icon>
              <v-icon class="showIfFuture">fast_forward</v-icon>
            </span>
            <span class="headline pr-3">{{ mySel.item.title }}</span>
            <span >{{ moment(mySel.item.date).format('dddd DD. MMM YYYY, H:mm[Uhr]') }}</span>
          </div>
        </template>

      </v-select>
      <v-spacer></v-spacer>

      <!-- Right side menu -->
      <v-menu
        :close-on-content-click="false"
        :nudge-width="200"
        offset-y
      >
        <v-icon
          slot="activator"
          dark
        >
         settings
        </v-icon>
        <v-card>
          <v-list>
            <v-list-tile>
              <v-list-tile-title>
                Einstellungen
              </v-list-tile-title>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
              <v-list-tile-sub-title>
                <v-subheader>
                  Grösse
                </v-subheader>
              </v-list-tile-sub-title>
              <div>
                <v-slider
                  :max="4"
                  v-model="baseSize"
                  class="px-3 pt-2"
                ></v-slider><br/>
              </div>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-menu>

    </v-toolbar>
    <div class="mainApp">
      <mainform :openDialog="openMainDialog" @closeDialog="closeMainform" :item="activeBooking" :performance="activePerformance"></mainform>
      <mainlist v-on:listActionBtn="openMainForm" :items="bookings"></mainlist>
    </div>
    <v-snackbar
      v-model='snackbar_show'
      :color='snack_color'
      :timeout='snack_timeout'
    >
      {{ snack_text }}
    <v-btn dark flat @click="snackbar_show = false"> Close </v-btn>
  </v-snackbar>
  </div>
</template>

<script>
  import moment from 'moment'
  import mainform from './mainform'
  import mainlist from './mainlist'
  import axios from 'axios'
/* eslint-disable no-console */
/*reservationIcon(item.resMeans)*/
export default {
  data: () => {
    return {
      openMainDialog: false,
      drawer: true,
      discountClient:'children',
// Menus
      showPerformanceMenu: false,
// snackbar
      snackbar_show: false,
      snack_color: 'success',
      snack_timeout: 6000,
      snack_text:'',
// state
      loading: false,
      baseSize: 0,
      today: '2018-10-10',
//  store
      bookings:[{id:0,name:'', booked:{}}],
      activeBooking: {id:0, name:'', booked:{}},
      performances: [{id:0,title:'', date:0}],
      activePerformance: {},
// app settings
      value: 0,
      ticksLabels: ['1','2','3','4']
    }
  },
  computed: {
    toolbarColor() {
      return (moment(this.today).isSame(this.activePerformance.date,'day') ? 'success' : 'info')
    },
    appSizer() {
      return ''// height: ' + (50+(this.baseSize*6))+'px'
    },
    sizeSetter() {
      return "app-size" + this.baseSize
    },
  },
  methods: {
// Developing...
    fakeToday() {
      this.today=moment()
    },
    openMainForm(item){
      this.activeBooking=item
      this.openMainDialog=true
    },
    closeMainform(modifiedItem){
      if (modifiedItem != null){
        this.activeItem.name=modifiedItem.name
      }
      this.openMainDialog=false
    },
    performanceListColor(dte){
      if (moment(this.today).isSame(dte,'day')) {
        return 'todaysPerformance'
      }
      return (moment(this.today).isBefore(dte) ? 'futurePerformance' : 'pastPerformance')
    },// Snackbar
    toggleSnackbarDelayed(show, delay=4000){
      setTimeout(()=>{
          this.snackbar_show = show
        }, delay
      )
    },
    showAlert(txt,type='success',tout=6000){ //'success','error','info'
      this.snack_timeout=tout
      this.snack_color=type
      this.snack_text=txt
      if (this.snackbar_show){
        this.snackbar_show = false
        this.toggleSnackbarDelayed(true)
      } else {
        this.snackbar_show = true
      }
    },
    showNote(txt,type='info') {
      this.showAlert(txt,type,0)
    },
    hideNote(newText=''){
      if (newText!=''){
        this.snack_text=newText
      }
      this.toggleSnackbarDelayed(false)
    },
// Axios
    loadBookings() {
      this.showNote('Lade Reservationen')
      let faddress='http://slimpp.local/fakeKasse/bookings/' + this.activePerformance.id
      axios.get(faddress)
        .then((response)  =>  {
          this.hideNote('Reservationen für '+ this.activePerformance.title + ' geladen')
          this.bookings = response.data.result
          this.activeBooking = this.bookings[0]
        }, (error)  =>  {
          this.showNote('Reservationen konnten nicht geladen werden','error')
          console.log(error)
        })
    },
    loadPerformances() {
      this.showNote('Lade Vorstellungen','error')
      axios.get("http://slimpp.local/fakeKasse/performances")
      .then((response)  =>  {
        this.hideNote('Vorstellungen geladen')
        this.performances = response.data.result
        this.activePerformance = this.performances[0]
        this.fakeToday()
      }, (error)  =>  {
        this.showAlert('Vorstellungen konnten nicht geladen werden','error')
        console.log(error)
      })
    },
    moment,
  },
  beforeMount: function() {
    this.loadPerformances()
  },
  components: { mainform, mainlist}
}
</script>

<style>
  .mainApp {
    flex: 1 1 100%;
    padding-top:44px;
    width:100%;
    margin:0;
    margin-bottom: -44px;
  }

.app-size0{
  height: 50px;
  font-size: 16px;
  line-height: 18px;
}
.app-size0 .app-size-subtitle {
  font-size: 12px;
}

.app-size1{
  height: 56px;
  font-size: 20px;
  line-height: 22px;

}
.app-size1 .app-size-subtitle {
  font-size: 16px;
}

.app-size2{
  height: 62px;
  font-size: 24px;
  line-height: 26px;
}
.app-size2 .app-size-subtitle {

  font-size: 18px;
}
.app-size3{
  height: 68px;
  font-size: 26px;
  line-height: 28px;

}
.app-size3 .app-size-subtitle {
  font-size: 20px;
}
.app-size4{
  height: 74px;
  font-size: 28px;
  padding-top: 10px;

}
.app-size4 .app-size-subtitle {
  line-height: 14px;
  font-size: 24px;
  padding-top: 16px;
  margin-top: -12px;
  height: 50px;
}

.performanceTitle{
  padding-top: 25px;
  padding-left: 20px;
  height: 50px;
}

.performanceDate{
  padding-top: 2px;
  height: 30px;
}

  .performanceDate i{
    font-size: 28px;
    padding-top: 20px;

  }
  /* remove stripe unde Performance-Dropdown */
.theme--dark .v-text-field .v-input__slot::before{
  content: none;
}

.theme--dark .v-text-field .v-input__slot::after{
    content: none;
  }
.performanceToday:before{
  content: "";
  background-color: chartreuse;
}
  .performanceNotToday{
    /*text-decoration-style: none;*/
  }

  .showIfFuture, .showIfPresent, .showIfPast {
    display:none;
  }

  .futurePerformance .showIfFuture{
    display: inline-block;
    width: 35px;
    color: teal;

  }
  .todaysPerformance .showIfPresent{
    display: inline-block;
    width: 35px;
    color: chartreuse;

  }
  .pastPerformance .showIfPast
  {
    display: inline-block;
    width: 35px;
    color: teal;
  }


</style>