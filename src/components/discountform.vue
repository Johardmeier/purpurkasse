<template>
  <v-layout row justify-center>

    <v-dialog
      v-model="dialogVisible"
      full-width
      persistent
    >
      <div>
        <v-layout row class="purple darker-2">
          <v-flex class="headline font-weight-medium ml-4 mt-2"> Rabatte</v-flex>
          <v-flex class="subheading ml-4 mt-3 grey--text">
            {{item.forename}} {{item.name}}
            <span class="ml-4">
              <v-icon small color="grey">event</v-icon>
              {{moment(item.booked.date).calendar()}}
            </span>
            <span class="ml-4">
              <v-icon v-text="resIcons[item.booked.means]" small color="grey"></v-icon>
              {{item.booked.contact}}
            </span>
          </v-flex>
          <v-flex class="pr-3">
            <v-tabs
              v-model="activeTab"
              right
              @input="tabChanged"
              color="purple darker-2"
              slider-color="yellow"
            >
              <v-tab ripple class="mt-2" tag="adults">
                Erwachsene
              </v-tab>
              <v-tab ripple  class="mt-2" tag="children">
                Kinder
              </v-tab>
            </v-tabs>

          </v-flex>

        </v-layout>
      </div>
      <v-card>
        <div>
          <v-form>
            <v-container fluid class="maincontainer">
              <v-layout column justify-start :class="[client==='children' ? 'childRow' : 'adultRow']" class="ma-2">
                <div class="bookedSideText">Reserviert:</div>
                <div class="bookedSideNum">{{item.booked[client]}}</div>
                <div class="bookedSideRest light-blue--text text--lighten-3">{{ regular.count +  tarifCount + keepBooked - item.booked[client] | numberDiff }}</div>

                <v-flex>
                  <v-layout row justify-start>

                    <v-flex xs5 >
                      <v-layout justify-end align-center my-2 >
                        <span class="title mr-2" >Normal</span>
                        <v-btn class="incDecBtn"  @click='(regular.count>0 ? regular.count-- : 0)'>
                          <v-icon >remove</v-icon>
                        </v-btn>
                        <span class="incDecNumber">
                          {{regular.count}}
                        </span>
                        <v-btn class="incDecBtn" @click="regular.count++">
                          <v-icon >add</v-icon>
                        </v-btn>
                      </v-layout>
                    </v-flex>

                    <v-flex xs4 >
                    </v-flex>

                    <v-flex xs3>
                      <v-layout justify-end align-center pr-3 fill-height>
                        <span class="headline">
                          <span class="grey--text subheading mr-2">Billette</span><span class="headline mr-4">{{regular.count}}</span>
                          <span class="grey--text subheading mr-2">Preis</span><span class="headline mr-4">{{regular.count*regular.price | numberSfr}}</span>
                        </span>
                      </v-layout>
                    </v-flex>


                  </v-layout>
                </v-flex>
                <v-divider></v-divider>

                <!--// MAIN THING ******************************************************************************************************-->

                <v-flex>
                  <v-layout row justify-start>

                    <v-flex xs6 >
                      <v-layout justify-space-between align-center my-4 mx-1 row>
                        <div class="title" >
                          Reduziert
                          <v-btn class="incDecBtn"  @click='tarifDec'>
                            <v-icon >remove</v-icon>
                          </v-btn>
                        </div>
                          <v-select
                            :items="tarifs"
                            outline
                            v-model="activeTarif"

                            item-text="tarifs"
                            label="[Rabatt...]"
                            item-value="tarif"
                            append-icon=""
                            return-object
                            single-line
                            close-on-click

                          >
                            <template slot="selection" slot-scope="myTarif">
                              <v-toolbar-title class="performanceTitle text-xs-center green--text"> {{ myTarif.item.tarif }} </v-toolbar-title>
                              <v-toolbar-items class="performanceDate">
                                <v-subheader> {{ myTarif.item.price }} </v-subheader>
                              </v-toolbar-items>
                            </template>

                            <template slot="item" slot-scope="myTarif2">
                              <v-toolbar-title class="performanceTitle text-xs-center green--text"> {{ myTarif2.item.tarif }} </v-toolbar-title>
                              <v-toolbar-items class="performanceDate">
                                <v-subheader> {{ myTarif2.item.price }} </v-subheader>
                              </v-toolbar-items>
                            </template>


                          </v-select>
                        <div>
                          <v-btn class="incDecBtn" @click="tarifInc">
                            <v-icon >add</v-icon>
                          </v-btn>
                        </div>
                      </v-layout>
                    </v-flex>

                    <v-flex xs3 >
                      <v-layout justify-center align-center my-4 column>
                        <table class="optionsTable" >
                          <tr v-for="tarif in tarifs" :key="tarif.tarif" :class="[tarif.tarif===activeTarif.tarif ? 'yellow black--text' : '']">
                            <td align="right" >{{tarif.count }}</td><td>{{tarif.tarif}}</td><td align="right">{{tarif.price  | numberSfr }}</td><td align="right">{{tarif.count * tarif.price | numberSfr }}</td>
                          </tr>
                        </table>
                      </v-layout>
                    </v-flex>

                    <v-flex xs3>
                      <v-layout justify-end align-center pr-3 fill-height>
                        <span class="headline">
                          <span class="grey--text subheading mr-2">Billette</span><span class="headline mr-4">{{tarifCount}}</span>
                          <span class="grey--text subheading mr-2">Preis</span><span class="headline mr-4">{{tarifSum | numberSfr}}</span>
                        </span>
                      </v-layout>
                    </v-flex>

                  </v-layout>
                </v-flex>

                <v-divider></v-divider>

                <v-flex>
                  <v-layout row justify-start>

                    <v-flex xs5 >
                      <v-layout justify-end align-center my-1 >
                        <span class="title mr-2" >zurückhalten</span>
                        <v-btn class="incDecBtn"  @click='(keepBooked>0 ? keepBooked-- : 0)'>
                          <v-icon >remove</v-icon>
                        </v-btn>
                        <span class="incDecNumber">
                          {{keepBooked}}
                        </span>
                        <v-btn class="incDecBtn" @click="keepBooked++">
                          <v-icon >add</v-icon>
                        </v-btn>
                      </v-layout>
                    </v-flex>

                    <v-flex xs4 >
                    </v-flex>

                    <v-flex xs3>
                      <v-layout justify-end align-center pr-3 fill-height>
                        <span class="headline">
                          <span class="grey--text subheading mr-2">Reservieren</span><span class="headline mr-4">{{keepBooked}}</span>
                        </span>
                      </v-layout>
                    </v-flex>


                  </v-layout>
                </v-flex>


              </v-layout>
            </v-container>
          </v-form>
        </div>

        <v-divider></v-divider>
        <v-card-actions>
          <v-layout justify-start row>
            <v-btn color="info" outline @click="closeDialog(false)">Gruppenrabatt</v-btn>
          </v-layout>
          <v-layout justify-end row>
            <v-btn color="error" @click="closeDialog(false)">Cancel</v-btn>
            <v-btn color="success" @click="closeDialog(true)">Bezahlen</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import moment from 'moment'
  export default {
    name: "discountform",
    data() {
      return {
        resIcons: {'tel':'phone', 'mail': 'email', 'web': 'cloud', 'pers':'person', 'other':'help'},
        booking:{adults:0,children:0},
        // collected:
        tarifs:[{'tarif':'','price':0,'count':0}],
        discounts:[{count:0,price:0,tarif:''}],
        discountsum:{adultCount:0,adultSum:0,childCount:0,childSum:0},
        regular:{count:0,price:0},
        keepBooked:0,

        remarks:'',
        invoice:false,

        showDialog: false,
        dummyCount: 0,
        activeTarif:{},
        tarifSum:0,
        tarifCount:0,
        activeTab:0

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
        //TODO:: ev. make sure, client is correctly spelled
        //Todo:: Resett ALL correctly
        this.createTarifs()
        if (this.client==='children'){
          this.regular.count=this.currentBookings.childCount
          this.regular.price=this.currentBookings.childPrice
        } else {
          this.regular.count=this.currentBookings.adultCount
          this.regular.price=this.currentBookings.adultPrice
        }
      }
    },
    props: {
      openDialog: Boolean,
      item: Object,
      performance: Object,
      currentBookings: Object,
      client: String //one of 'children','adults'
    },
    methods: {
      tabChanged(tab) {
        console.log(tab)
      },
      tarifInc() {
        this.activeTarif.count++
        this.recalcTarifSums()
      },
      tarifDec() {
        (this.activeTarif.count>0 ? this.activeTarif.count-- : 0)
        this.recalcTarifSums()
      },
      recalcTarifSums() {
        let tSum=0
        let tCount=0
        this.tarifs.forEach((item) => {
          tSum+=item.count*item.price
          tCount+=item.count
        })
        this.tarifSum=tSum
        this.tarifCount=tCount
      },
      closeDialog(save){
        this.$emit('closeDiscountDialog',(save ? {}:null))
      },
      createTarifs() {
        this.tarifs = []
        this.performance.discounts[this.client].forEach(
          (tarif) => {
            this.tarifs.push(
              {
                'tarif': tarif.name,
                'price': tarif.price,
                'count': 0
              }
            )
          }
        )
        this.activeTarif=this.tarifs[0]
        //TODO:: add Empty customizable Tarif -> so theres always at least one...
        if (this.item.collected && this.item.collected.discounts) {
          this.item.collected.discounts[this.client].forEach(
            (discounted) => {
              let tar = this.tarifs.find((att) => {
                return att.tarif === discounted.tarif
              })
              if (tar === undefined) {
                this.tarifs.push(
                  {
                    'tarif': discounted.name,
                    'price': discounted.price,
                    'count': discounted.copunt
                  }
                )
              } else {
                if (tar.price === discounted.price) {
                  tar.count = discounted.count
                } else {
                  this.tarifs.push(
                    {
                      'tarif': discounted.name + '!anderer_Preis!', //TODO:: Versioning system?
                      'price': discounted.price,
                      'count': discounted.copunt
                    }
                  )
                }
              }
            }
          )
        }
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

  .optionsGrid {
    width: 60px;
    text-align: center;
    border: 1px solid rgba(150,150,150,1);;
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
    left: -55px;
    width: 55px;
    text-align: center;
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
    left: -55px;
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
    left: -55px;
    width:55px;
    position: relative;
    height:0;
    top: 25px;
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