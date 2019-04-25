<template>
  <v-layout row justify-center>

  <v-dialog
    v-model="dialogVisible"
    full-width
    persistent
  >
    <v-card>
      <v-card-title class="blue darken-4">
        <v-layout align-end justify-space between fill-height>
          <span class="headline">{{item.forename}} {{item.name}}</span>
          <div class="grey--text text-xs-center ml-4">
            <span>
            <v-icon small>event</v-icon>
              {{moment(item.booked.date).calendar()}}
            </span>
            <span>
              <v-icon v-text="resIcons[item.booked.means]" small></v-icon>
              {{item.booked.contact}}
            </span>
          </div>
        </v-layout>
      </v-card-title>
      <v-divider></v-divider>
      <div>
        <v-form>
          <v-container fluid class="maincontainer">
            <v-layout row justify-start class="adultRow ma-2">
            <!-- Erwachsene -->
              <v-flex xs6 >
                <div class="bookedSideText">Reserviert:</div>
                <div class="bookedSideNum">{{item.booked.adults}}</div>
                <div class="bookedSideRest teal--text text--lighten-3">{{regular.adultCount + discountsum.adultCount + keepBooked.adults.count - item.booked.adults   | numberDiff }}</div>
                <v-layout justify-end align-center my-4>
                  <span class="title mr-2">Erwachsene</span>
                  <v-btn  class="incDecBtn"   @click='(regular.adultCount>0 ? regular.adultCount-- : 0)'>
                    <v-icon >remove</v-icon>
                  </v-btn>
                  <span class="incDecNumber">
                    {{regular.adultCount}}
                  </span>
                  <v-btn  class="incDecBtn"   @click="regular.adultCount++">
                    <v-icon >add</v-icon>
                  </v-btn>
                  <v-btn flat @click="openDiscountDialog('adults')">
                    <v-icon>playlist_add</v-icon>
                  </v-btn>
                </v-layout>
              </v-flex>
              <v-flex xs3 >
                <v-layout justify-center align-center my-4 column v-if="(regular.adultCount + discountsum.adultCount + keepBooked.adults.count)>0">
                  <table class="optionsTable" >
                    <tr v-if="regular.adultCount>0">
                      <td align="right">{{regular.adultCount}}</td><td>Normalpreis</td><td align="right">{{regular.adultPrice | numberSfr}}</td><td align="right">{{regular.adultCount * regular.adultPrice | numberSfr }}</td>
                    </tr>
                    <tr v-for="discount in discounts.adults" :key="discount.tarif" v-if="discount.count>0">
                      <td align="right">{{discount.count }}</td><td>{{discount.tarif}}</td><td align="right">{{discount.price  | numberSfr }}</td><td align="right">{{discount.count * discount.price | numberSfr }}</td>
                    </tr>
                    <tr class="keepBooked teal darken-3 white--text" v-if="(keepBooked.adults.count)>0">
                      <td align="right">{{keepBooked.adults.count}}</td><td colspan="3" align="center">bleibt Reserviert</td>
                    </tr>
                  </table>
                </v-layout>
              </v-flex>
              <v-flex xs3>
                <v-layout justify-end align-end pr-3 fill-height>
                  <span class="headline">
                    <span class="grey--text subheading mr-2">Erwachsene</span><span class="headline mr-4">{{regular.adultCount + discountsum.adultCount}}</span>
                    <span class="grey--text subheading mr-2">Preis</span><span class="headline mr-4">{{regular.adultCount*regular.adultPrice + discountsum.adultSum | numberSfr}}</span>
                  </span>
                </v-layout>
              </v-flex>
            </v-layout>
            <v-layout  row justify-start class="childRow ma-2">
            <!-- Kinder -->
              <!-- //TODO:: check if bookedside divs should go here -> no padding -> width==-left -->
              <v-flex xs6 >
                <div class="bookedSideText">Reserviert:</div>
                <div class="bookedSideNum">{{item.booked.children}}</div>
                <div class="bookedSideRest light-blue--text text--lighten-3">{{ regular.childCount +  discountsum.childCount + keepBooked.children.count - item.booked.children| numberDiff }}</div>
                <v-layout justify-end align-center my-4>
                  <span class="title mr-2" >Kinder</span>
                  <v-btn class="incDecBtn"  @click='(regular.childCount>0 ? regular.childCount-- : 0)'>
                    <v-icon >remove</v-icon>
                  </v-btn>
                  <span class="incDecNumber">
                      {{regular.childCount}}
                  </span>
                  <v-btn class="incDecBtn" @click="regular.childCount++">
                    <v-icon >add</v-icon>
                  </v-btn>
                </v-layout>
              </v-flex>
              <v-flex xs3 >
                <v-layout justify-center align-center my-4 column v-if="(regular.childCount + discountsum.childCount + keepBooked.children.count)>0">
                  <table class="optionsTable" >
                    <tr v-if="regular.childCount>0">
                      <td align="right">{{regular.childCount}}</td><td>Normalpreis</td><td align="right">{{regular.childPrice | numberSfr}}</td><td align="right">{{regular.childCount * regular.childPrice | numberSfr }}</td>
                    </tr>
                    <tr v-for="discount in discounts.children" :key="discount.tarif" v-if="discount.count>0">
                      <td align="right">{{discount.count }}</td><td>{{discount.tarif}}</td><td align="right">{{discount.price  | numberSfr }}</td><td align="right">{{discount.count * discount.price | numberSfr }}</td>
                    </tr>
                    <tr class="keepBooked light-blue darken-3 white--text" v-if="(keepBooked.children.count)>0">
                      <td align="right">{{keepBooked.children.count}}</td><td colspan="3" align="center">bleibt Reserviert</td>
                    </tr>
                  </table>
                </v-layout>
              </v-flex>
              <v-flex xs3>
                <v-layout justify-end align-end pr-3 fill-height>
                  <span class="headline">
                    <span class="grey--text subheading mr-2">Kinder</span><span class="headline mr-4">{{regular.childCount + discountsum.childCount}}</span>
                    <span class="grey--text subheading mr-2">Preis</span><span class="headline mr-4">{{regular.childCount*regular.childPrice + discountsum.childSum | numberSfr}}</span>
                  </span>
                </v-layout>
              </v-flex>
            </v-layout>

            <!-- Total -->
            <v-layout justify-end mr-2>
              <v-flex xm2 xs4 class="resultRow">
                <div class="bookedSideRestTotal red--text text--lighten-3">{{regular.adultCount + discountsum.adultCount + regular.childCount + discountsum.childCount + keepBooked.adults.count +keepBooked.children.count - (item.booked.adults +item.booked.children)| numberDiff }}</div>
                <div class="bookedSideText ml-1">Total:</div>
                <v-layout justify-end align-end pr-3 my-3 column>
                  <v-flex xs12 class="headline">
                    <span class="grey--text subheading mr-2">Personen</span><span class="headline mr-4">{{regular.adultCount + discountsum.adultCount + regular.childCount+discountsum.childCount}}</span>
                    <span class="grey--text subheading mr-2">Preis</span><span class="headline mr-4">{{regular.adultCount*regular.adultPrice + discountsum.adultSum + regular.childCount*regular.childPrice+discountsum.childSum | numberSfr }}</span>
                  </v-flex>
                </v-layout>
                <v-flex xs12 class="onInvoicePanel red--text yellow lighten-1 mx-5" v-if="invoice">Auf Rechnung</v-flex>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </div>

      <v-divider></v-divider>
      <v-card-actions>
        <v-layout justify-start row>
          <v-btn color="info" outline @click="discountDialogOpen=true">Rabatte</v-btn>
          <v-btn color="info" outline @click="invoice=!invoice">auf Rechnung</v-btn>
        </v-layout>
        <v-layout justify-end row>
          <v-btn color="error" @click="closeDialog(false)">Cancel</v-btn>
          <v-btn color="success" @click="closeDialog(true)">Bezahlen</v-btn>
        </v-layout>
      </v-card-actions>
      <discountform :openDialog="discountDialogOpen" @closeDiscountDialog="closeDiscountDialog" :item="item"
                    :performance="performance" :client="discountClient" :currentBookings="regular"></discountform>
    </v-card>
  </v-dialog>
  </v-layout>
</template>

<script>
  import moment from 'moment'
  import discountform from './discountform'

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
        discountClient: 'children'
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
        this.regular.adultPrice=this.performance.prices.adults
        this.regular.childPrice=this.performance.prices.children
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
      discountform
    }
  }
</script>

<style scoped>
  .maincontainer{
    padding-top:2px;
  }

  .adultRow{
    border: 1px solid #009688; /*  vuetify-teal */
    border-left-width: 55px;
    border-radius: 10px;
    /*background-color: rgba(100,100,100,0.2);*/
    /*background-color: rgba(45, 191, 112, 0.1);*/
    /*background-color: rgb(0, 114, 72);*/
    margin: 4px;
  }
  .childRow{
/*    border: 1px solid #5786d3;*/
    border: 1px solid #03a9f4; /* vuetify light-blue */
    border-left-width: 55px;
    border-radius: 10px;
    /*background-color: rgba(0, 21, 142, 0.1);*/
    /*background-color: rgba(20,20,20,0.4);*/
    margin: 4px;
  }

  .resultRow{
    border: 1px solid #f44336;
    border-radius: 10px;
    border-left-width: 55px;
    /*    background-color: rgba(100,100,100,0.2);*/
    /*background-color: rgba(20,20,20,0.4);*/
  }

  .reserveRow{
    font-size: 16px;
    font-weight: 400;
    font-family: Roboto, sans-serif;
    margin-left: 40px;
    margin-right:40px;
    /*background-color: rgba(20,20,20,0.4);*/
    text-align: right;
    color: darkgrey;
    /*border: 1px solid indianred;*/
    border-radius: 10px;
    background-color: rgba(100,100,100,0.3);
    /*background-color: rgba(20,20,20,0.4);*/
  }

  .incDecBtn {
    border: 2px solid rgba(100,100,100,1);
    /*    background-color: rgba(100,100,100,0.2);*/
    background-color: rgba(20,20,20,0.4);
    height: 50px;
    min-width: 60px;
    border-radius: 8px;

  }

  .discountBtn {
    width: 140px;
    border: 1px solid rgba(120,120,0,0.8);;
    background-color: rgba(100,100,100,0.7);
    color: rgba(120,120,0,1);
    border-radius: 14px;
    font-size: 12px;
    font-weight: 400;
    font-family: Roboto, sans-serif;
    font-stretch: condensed;
  }

  .keepBookedBtn{
    width: 120px;
    text-align: center;
    border: 1px solid rgba(2000,80,150,0.8);
    background-color: rgba(100,100,100,0.7);
    border-radius: 14px;
    padding-top: 0px;
    padding-bottom: 5px;
    color:  rgba(2000,80,150,0.8);
    line-height: 10px;
    font-size: 9px;
    font-weight: 400;
    font-family: Roboto, sans-serif;

  }

  .incDecNumber {
    width: 60px;

    text-align: center;
    border: 1px solid rgba(150,150,150,1);;
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

.bookedSideText {
  overflow: visible;
  display: block;
  height:0;
  position: relative;
  top: 16px;
  left: -56px;
  font-size: 9px;
  font-weight: 600;
  font-family: Roboto, sans-serif;

}

.bookedSideRest{
  overflow: visible;
  display: block;
  position: relative;
  height:0;
  width:55px;
  top: 70px;
  left: -63px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  font-family: Roboto, sans-serif;

}

.bookedSideRestTotal{
  overflow: visible;
  display: block;
  position: relative;
  height:0;
  width: 55px;
  top: 36px;
  left: -63px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  font-family: Roboto, sans-serif;

}

.bookedSideNum{
    overflow: visible;
    display: block;
    width:55px;
    position: relative;
    height:0;
    top: 25px;
    left: -63px;
    padding:0;
    margin:0;
    text-align: center;
    font-size: 34px;
    font-weight: 600;
    font-family: Roboto, sans-serif;

  }

  .theme--dark .v-btn:not(.v-btn--icon):not(.v-btn--flat) {
    background-color: rgba(100,100,100,0.2);
  }

  .onInvoicePanel {
    border-radius: 8px;
    text-align: center;
    margin-bottom: -6px;
    bottom: 0;
  }

  .roundedBG{
    border-radius: 10px;
  }


  .optionsTable {
    border-collapse: collapse;
    color: darkgrey;
  }

  .optionsTable tr {
    line-height: 0.8;
  }

  .optionsTable td{
    padding: 2px 6px;
  }

  .optionsTable .keepBooked{
    font-weight: 500;
  }


</style>