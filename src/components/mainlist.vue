<template>
  <v-list>
    <div
      v-for="(item, index) in items"
      :key=item.id
    >
      <v-list-tile
        two-line
        @click="setActive(item.id)"
        :class="sizeSetter"
      >
        <v-list-tile-content class="list_customer">
          <v-list-tile-title>
            {{item.name}}
          </v-list-tile-title>
          <v-list-tile-sub-title class="app-size-subtitle">
            {{item.forename}}
          </v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-content class="list_reservation">
          <v-list-tile-sub-title class="app-size-subtitle">
              <span>
                <v-icon small>event</v-icon>
                {{moment(item.booked.date).calendar()}}
              </span>
          </v-list-tile-sub-title>
          <v-list-tile-sub-title class="app-size-subtitle pl-2">
              <span>
                <v-icon v-text="resIcons[item.booked.means]" small></v-icon>
                {{item.booked.contact}}
              </span>
          </v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-content class="list_reservedfor">
          <div class="text-xs-center">
            <v-chip small color="teal darken-3 teal--text text--lighten-2">
              {{item.booked.adults}}
            </v-chip>
            <v-chip  small color="light-blue darken-4 light-blue--text">
              {{item.booked.children}}
            </v-chip>
          </div>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-btn fab small color="cyan" ripple @click.stop="openItem(item)" v-if="selectedId===item.id">
            <v-icon>keyboard_arrow_right</v-icon >
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider
        v-if="index + 1 < items.length"
        :key="index"
      ></v-divider>
    </div>
  </v-list>

</template>

<script>
  import moment from 'moment'
  export default {
    name: "mainlist",
  data: () => {
      return {
        selectedId: 0,
        resIcons: {'tel':'phone', 'mail': 'email', 'web': 'cloud', 'pers':'person', 'other':'help', 'special':'star'},
      }
    },
    props: {
      items: Array
    },
    computed: {
      sizeSetter() {
        return "app-size" + this.baseSize
      }
    },
    methods: {
      moment,
      openItem(item) {
        this.$emit('listActionBtn',item)
      },
      setActive(id){
        this.selectedId=id
      }
    },
  }
</script>

<style>
  .list_customer, .list_reservation, .list_reservedfor {
    width: 0; /*make them same size. why this works? I dont know...*/
  }

  .list_reservation {
  }
  .list_reservedfor {
  }

  .list_reservation div, .list_reservation i{
    color: grey !important;
  }

  .list_tile .active {
    background-color: beige;
  }

  .v-list__tile {
    font-size: inherit;
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

</style>