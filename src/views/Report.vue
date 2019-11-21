<template>
  <div>
    <h1>{{ report.title }}</h1>
    <p>Id: {{ report.id }}</p>
  </div>
</template>

<script>
export default {
  name: 'report',
  data: () => ({
    report: {
      id: 1234,
      title: 'Le titre est là',
    },
  }),
};
</script>
