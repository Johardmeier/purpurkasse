<template>
  <v-layout row justify-start class="adultRow ma-2">
    <v-flex xs6 >
      <div class="bookedSideText">Reserviert:</div>
      <div class="bookedSideNum">{{openBookings}}</div>
      <div class="bookedSideRest teal--text text--lighten-3">{{ticketsCount + tarifsCount + keepOpen - openBookings | numberDiff }}</div>
      <v-layout justify-end align-center my-4>
        <span class="title mr-2">Discounts</span>
        <v-btn  class="incDecBtn"   @click='(ticketsCount>0 ? ticketsCount-- : 0)'>
          <v-icon >remove</v-icon>
        </v-btn>
        <span class="incDecNumber">
                      {{ticketsCount}}
                    </span>
        <v-btn  class="incDecBtn"   @click="ticketsCount++">
          <v-icon >add</v-icon>
        </v-btn>
      </v-layout>
    </v-flex>
    <v-flex xs3 >
      <v-layout justify-center align-center my-4 column v-if="(ticketsCount + tarifsCount + keepOpen)>0">
        <table class="optionsTable" >
          <tr v-if="ticketsCount>0">
            <td align="right">{{ticketsCount}}</td><td>Normalpreis</td><td align="right">{{ticketPrice | numberSfr}}</td><td align="right">{{ticketsCount * ticketPrice | numberSfr }}</td>
          </tr>
          <tr v-for="tarif in tarifs" :key="tarif.tarif" v-if="tarif.count>0">
            <td align="right">{{tarif.count }}</td><td>{{tarif.tarif}}</td><td align="right">{{tarif.price  | numberSfr }}</td><td align="right">{{tarif.count * tarif.price | numberSfr }}</td>
          </tr>
          <tr class="keepBooked teal darken-3 white--text" v-if="(keepOpen)>0">
            <td align="right">{{keepOpen}}</td><td colspan="3" align="center">bleibt Reserviert</td>
          </tr>
        </table>
      </v-layout>
    </v-flex>
    <v-flex xs3>
      <v-layout justify-end align-end pr-3 fill-height>
                    <span class="headline">
                      <span class="grey--text subheading mr-2">Erwachsene</span><span class="headline mr-4">{{ticketsCount + tarifsCount}}</span>
                      <span class="grey--text subheading mr-2">Preis</span><span class="headline mr-4">{{ticketsCount*ticketPrice + tarifsSum | numberSfr}}</span>
                    </span>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: "discountTile",
    data() {
      return {
        ticketsCount: this.keepOpen
      }
    },
    props: {
      isAdult:true,
      openBookings: Number,
      ticketPrice: Number,
      tarifs:Array,
      keepOpen: Number
    },
    computed: {
      tarifsSum: function() {
        let tSum=0
        this.tarifs.forEach((item) => {
          tSum+=item.count*item.price
        })
        return tSum
      },
      tarifsCount: function()  {
        let tCount=0
        this.tarifs.forEach((item) => {
          tCount+=item.count
        })
        return tCount
      }
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
