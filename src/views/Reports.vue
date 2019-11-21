<template>
  <div>
    <h1>Rapports incidents/accidents</h1>
    <ul>
      <li v-for="report in reports" :key="report.id">
        <router-link :to="{ name: 'report', params: { id: report.id } }"
          >{{ report.id }}: {{ report.title }}</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'reports',
  data: () => ({
    reports: [
      {
        id: 1234,
        title: 'QSDx',
      },
    ],
  }),
};
</script>
