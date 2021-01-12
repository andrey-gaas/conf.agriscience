<template>
  <mdb-container class="header">
    <mdb-navbar hamburger expand="xl">
      <mdb-navbar-brand>
        Navbar
      </mdb-navbar-brand>
      <mdb-navbar-toggler>
        <mdb-navbar-nav right>
          <mdb-nav-item href="#" waves-fixed>Home</mdb-nav-item>
          <mdb-nav-item href="#" waves-fixed>Features</mdb-nav-item>
          <mdb-nav-item href="#" waves-fixed>Pricing</mdb-nav-item>
        </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>
  </mdb-container>
</template>

<script>
import {
  mdbNavbar,
  mdbNavItem,
  mdbNavbarNav,
  mdbNavbarToggler,
  mdbContainer,
  mdbRow,
  mdbInput,
  mdbNavbarBrand,
  mdbIcon,
} from 'mdbvue';

export default {
  components: {
    mdbNavbar,
    mdbNavItem,
    mdbNavbarNav,
    mdbNavbarToggler,
    mdbContainer,
    mdbRow,
    mdbInput,
    mdbNavbarBrand,
    mdbIcon
  },
}
</script>

<style lang="scss" scoped>
  .header {
    position: fixed;
    margin: 0;
    padding: 0;
    background: #eee;
    @media (min-width: 768px) {
      display: none;
    }
  }
</style>