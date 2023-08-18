<script setup lang="ts">
  /***************************************************************
   * 参考文献: https://zenn.dev/shuuuuuun/articles/36a980f97c4c34
   ***************************************************************/
  import axios from 'axios';
  import { onMounted, ref } from 'vue';

  // env
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
  const key = import.meta.env.VITE_API_KEY;
  const webHookUrl = import.meta.env.VITE_SLACK_WEBHOOK_URL;

  //reactive calendar data
  let calendarData = ref<any>();

  // get calendar data
  const getCalendar = async () => {
    const response = await axios.get(
      `https://www.googleapis.com/calendar/v3/calendars/t-koike@marsflag.com/events?key=${key}`
    );

    calendarData.value = response.data.items;
  };

  // get calendar id
  const getCalendarId = async () => {
    axios
      .get(`https://www.googleapis.com/calendar/v3/users/me/calendarList`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => {
        console.log('カレンダーリストの取得に成功しました。', response.data);
      })
      .catch(error => {
        console.error('カレンダーリストの取得に失敗しました。', error);
      });
  };

  // observe calendar data
  // const observeCalendarData = async () => {
  //   const response = await axios.post(
  //     `https://www.googleapis.com/calendar/v3/calendars/t-koike@marsflag.com/events/watch`
  //   );
  // };

  // send slack message
  // const handleSlack = () => {
  //   axios.post(`${webHookUrl}`, JSON.stringify({ text: 'testです。' }));
  // };

  onMounted(async () => {
    // await getCalendarId();
    await getCalendar();
    // await observeCalendarData();
  });
</script>

<template>
  <div class="main">
    <h1>google Auth Login OK</h1>
  </div>
</template>

<style lang="scss" scoped></style>
