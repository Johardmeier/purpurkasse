<template>
  <v-layout row justify-center>

  <v-dialog
    v-model="dialogVisible"
    full-width
    persistent
  >
      <div>
        <v-layout row class="blue darken-4" fill-height justify-space-between align-center>
          <v-flex class="headline ml-4 mt-2">
            {{item.forename}} {{item.name}}
          </v-flex>
          <v-flex class="blue--text text-xs-left ml-4 mt-3">
            <span class="ml-4">
              <v-icon small color="blue">event</v-icon>
              {{moment(item.booked.date).calendar()}}
            </span>
            <span class="ml-4">
              <v-icon v-text="resIcons[item.booked.means]" small color="blue"></v-icon>
              {{item.booked.contact}}
            </span>
          </v-flex>
          <v-flex class="pr-5">
            <v-tabs
              v-model="activeTab"
              right
              @input="tabChanged"
              color="blue darken-4"
              slider-color="yellow"
            >
              <v-tab ripple class="mt-2">
                Normalpreis
              </v-tab>
              <v-tab ripple class="mt-2">
                Rabatte
              </v-tab>
              <v-tab ripple  class="mt-2">
                Weiteres
              </v-tab>
            </v-tabs>

          </v-flex>

        </v-layout>
      </div>
    <v-card>

      <div>
        <v-form>
          <v-container fluid class="maincontainer">
            <v-tabs-items v-model="activeTab">
              <v-tab-item
                id="`tab1`"
                key="1"
              >
                <standard-tile
                  :isAdult=true
                  :open-bookings="keepBooked.adults.count"
                  :ticket-price="regular.adultprice"
                  :tarifs="discounts.adults"
                  :keep-open="keepBooked.adults.count"
                ></standard-tile>
                <standard-tile
                  :isAdult=false
                  :open-bookings="keepBooked.children.count"
                  :ticket-price="regular.adultprice"
                  :tarifs="discounts.children"
                  :keep-open="keepBooked.children.count"
                ></standard-tile>
              </v-tab-item>
              <v-tab-item
                id="`tab2`"
                key="2"
              >
                <discount-tile
                  isAdult=true
                  :open-bookings="keepBooked.adults.count"
                  :ticket-price="regular.childprice"
                  :tarifs="discounts.adults"
                  :keep-open="keepBooked.adults.count"
                ></discount-tile>
                <discount-tile
                  isAdult=false
                  :open-bookings="keepBooked.children.count"
                  :ticket-price="regular.childprice"
                  :tarifs="discounts.children"
                  :keep-open="keepBooked.children.count"
                ></discount-tile>
              </v-tab-item>
            </v-tabs-items>

            <!-- Total -->
            <v-layout justify-end>
              <v-flex xs4 xm2 class="ticketPanel resultBorder">
                <div class="sidePanel">
                  <div>Total:</div>
                  <div>{{regular.adultCount + discountsum.adultCount + regular.childCount + discountsum.childCount + keepBooked.adults.count +keepBooked.children.count - (item.booked.adults +item.booked.children)| numberDiff }}</div>
                  <div></div>
                </div>
                <v-layout justify-end align-end fill-height column>
                  <span class="headline">
                    <span class="grey--text subheading mr-2">Personen</span><span class="headline mr-4">{{regular.adultCount + discountsum.adultCount + regular.childCount+discountsum.childCount}}</span>
                    <span class="grey--text subheading mr-2">Preis</span><span class="headline mr-4">{{regular.adultCount*regular.adultPrice + discountsum.adultSum + regular.childCount*regular.childPrice+discountsum.childSum | numberSfr }}</span>
                  </span>
                </v-layout>
              </v-flex>
            </v-layout>

          </v-container>
        </v-form>
      </div>

      <v-divider></v-divider>
      <v-card-actions>
        <v-layout justify-start row>
          <v-btn color="info" outline @click="invoice=!invoice">auf Rechnung</v-btn>
        </v-layout>
        <v-layout justify-end row>
          <v-btn color="error" @click="closeDialog(false)">Abbrechen</v-btn>
          <v-btn :class="(invoice ? 'red--text yellow' : 'success')" @click="closeDialog(true)">{{(invoice ? 'Auf Rechnung' : 'Bezahlen')}}</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </v-layout>
</template>

<script>
  import moment from 'moment'
  import standardTile from './standardTile'
  import discountTile from './discountTile'

  export default {
    name: "mainform",
    data() {
      return {
        toggletest: 0,
        resIcons: {'tel':'phone', 'mail': 'email', 'web': 'cloud', 'pers':'person', 'other':'help'},
        booking:{adults:0,children:0},
        // collected:
        discounts:{adults:[{count:0,price:0,tarif:''}],children:[{count:0,price:0,tarif:''}]},
        discountsum:{adultCount:0,adultSum:0,childCount:0,childSum:0},
        regular:{adultCount:0,adultPrice:0,childCount:0,childPrice:0},
        remarks:'',
        invoice:false,
        discountDialogOpen:false,
        keepBooked:{adults:{count:0,details:''},children:{count:0,details:''}},
        showDialog: false,
        dummyCount: 0,
        discountClient: 'children',
        activeTab:0,
      }
    },
    computed: {
      dialogVisible: {
        get: function() {return this.openDialog},
        set: function() {this.$emit('closeDialog')}
      },
    },
    watch: {
      openDialog: function() {
        this.resetKeepBooked()
        this.resetDiscounts()
        this.remarks=''
        this.regular.adultCount=this.item.booked.adults
        this.regular.childCount=this.item.booked.children
//        this.regular.adultPrice=this.performance.prices.adults
//        this.regular.childPrice=this.performance.prices.children
      }
    },
    props: {
      openDialog: Boolean,
      item: Object,
      performance: Object
    },
    methods: {
      resetDiscounts(){
        this.discounts={adults:[{count:0,price:0,tarif:''}],children:[{count:0,price:0,tarif:''}]}
        this.discountsum={adultCount:0,adultSum:0,childCount:0,childSum:0}
      },
      resetKeepBooked(){
        this.keepBooked={
          adults:{
            count:0,
            details:''
          },
          children:{
            count:0,
            details:''
          }
        }
      },
      tabChanged(){

      },
      closeDiscountDialog(result){
        this.discountDialogOpen=false
      },
      calcDiscounts(){

      },
      closeDialog(save) {
        this.$emit('closeDialog',(save ? this.modifiedItem : null))
      },
      moment
    },
    filters: {
      numberDiff(value) {
        return (value>0 ? '+'+value :(value<0 ? value : ''))
      },
      numberSfr(value) {
        let num=parseFloat(value)
        return (num==num.toFixed(0) ? value + '.--' : value)
      }
    },
    components:{
      standardTile, discountTile
    }
  }
</script>

<style>
  .maincontainer{
    padding-top:2px;
  }

  .ticketPanel{
    border-width: 1px;
    border-style: solid;
    border-left-width: 55px;
    border-radius: 10px;
    margin-bottom: 8px;
    padding: 0;
    min-height: 130px;
    position:relative;
  }

  .adultBorder{
    border-color: #009688; /*  vuetify-teal */
  }

  .childBorder{
    border-color: #03a9f4; /* vuetify light-blue */
  }

  .resultBorder{
    border-color: #f44336;
    min-height: 110px;
    margin-right:8px;
  }

  .ticketPanel > .sidePanel {
    position: absolute;
    top: 0px;
    left: -55px;
    height:100%;
    width: 55px;
    display: flex;
    justify-content: center;
    flex-flow: column;
    align-items: center;
    font-weight: 600;
    font-family: Roboto, sans-serif;
  }

  .ticketPanel>.sidePanel>div:nth-child(1){
    height: 30px;
    padding-top: 22px;
    font-size: 9px;
  }

  .ticketPanel>.sidePanel>div:nth-child(2){
    font-size: 34px;
  }

  .ticketPanel>.sidePanel>div:nth-child(3){
    height: 30px;
    font-size: 16px;
    line-height: 0;
  }

  .ticketPanel.adultBorder>.sidePanel>div:nth-child(3){
    color: #80CBC4; /*  vuetify-teal lighten-3*/
  }

  .ticketPanel.childBorder>.sidePanel>div:nth-child(3){
    color: #80CBC4; /*  vuetify-teal lighten-3*/
  }

  .incDecBtn {
    border: 2px solid rgba(100,100,100,1);
    background-color: rgba(20,20,20,0.4);
    height: 50px;
    min-width: 60px;
    border-radius: 8px;
  }

  .incDecNumber {
    width: 60px;
    text-align: center;
    border: 5px solid rgba(150,150,150,1);;
    background-color: rgba(100,100,100,0.7);
    border-radius: 4px;
    padding-top: 3px;
    padding-bottom: 5px;
    color: white;
    line-height: 40px;
    font-size: 34px;
    font-weight: 600;
    font-family: Roboto, sans-serif;
  }

</style>