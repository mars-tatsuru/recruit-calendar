<script setup lang="ts">
  import { onMounted, reactive } from 'vue';
  import axios from 'axios';
  import FullCalendar from '@fullcalendar/vue3';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import interactionPlugin from '@fullcalendar/interaction';
  import googleCalendarPlugin from '@fullcalendar/google-calendar';
  import listPlugin from '@fullcalendar/list';
  import daygridPlugin from '@fullcalendar/daygrid';
  import timegridPlugin from '@fullcalendar/timegrid';

  const option = reactive<any>({
    plugins: [
      dayGridPlugin,
      interactionPlugin,
      listPlugin,
      daygridPlugin,
      timegridPlugin,
      googleCalendarPlugin
    ],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      // right: "",
      right: 'dayGridMonth, dayGridWeek, listDay'
    },
    events: [],
    editable: true,
    selectable: true,
    weekends: true,
    locale: 'jaLocale',
    timeZone: 'Asia/Tokyo',

    select: () => {},

    eventClick: (arg: { event: { title: any } }) => {
      if (arg.event) {
        // console.log(arg)
      }
    }
  });

  const key = import.meta.env.VITE_API_KEY;

  // create calendar function
  const createCalender = async () => {
    option.events = [];

    // 会社の個人カレンダー
    const calendar = await axios.get(
      `https://www.googleapis.com/calendar/v3/calendars/t-koike@marsflag.com/events?key=${key}`
    );

    // 個人のカレンダー(k.t)
    // const calendar = await axios.get(
    //   "https://www.googleapis.com/calendar/v3/calendars/k.t.19963469@gmail.com/events?key=AIzaSyALMg63-YZM_3sl0KNsymKodl7sNe_1PGY"
    // );

    const holiday = await axios.get(
      'https://holidays-jp.github.io/api/v1/date.json'
      // 商用は可能なのかな？(https://holidays-jp.github.io/)
    );

    // 平日や入れた予定を取得して、カレンダーに表示する
    for (const item of calendar.data.items) {
      if (item.start) {
        if (item.start.dateTime) {
          item.start.date = item.start.dateTime.split('T')[0];
        }
      }

      if (item.end) {
        if (item.end.dateTime) {
          item.start.date = item.end.dateTime.split('T')[0];
        }
      }

      if (!item.summary) item.summary = '';

      if (item.start && item.end) {
        option.events.push({
          title: item.summary,
          start: item.start.date,
          end: item.end.date
        });
      }
    }

    // 祝日を取得して、カレンダーに表示する
    const holidayObj = holiday.data;
    let holidayArr = Object.keys(holidayObj).map(function (key) {
      return [key, holidayObj[key]];
    });

    for (const item of holidayArr) {
      option.events.push({
        title: item[1],
        start: item[0],
        end: item[0],
        color: '#1D743F'
      });
    }
  };

  onMounted(() => {
    createCalender();
  });
</script>

<template>
  <Suspense>
    <FullCalendar :options="option" />
  </Suspense>
</template>

<style scoped></style>
