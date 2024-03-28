terraform {
    required_providers {
      docker = {
        source = "kreuzwerker/docker"
        version = "~> 3.0.1"
      }
    }
}

provider "docker" {
  host = "npipe:////.//pipe//docker_engine"
}

resource "docker_image" "mssql" {
  name = "mcr.microsoft.com/mssql/server:2022-latest"
  keep_locally = false
}

resource "docker_container" "mssql" {
  image = docker_image.mssql.image_id
  name = "mssql_tf_container"

  ports {
    internal = 1433
    external = 14335
  }
}

resource "docker_image" "nginx" {
  name         = "nginx"
  keep_locally = false
}

resource "docker_container" "nginx" {
  image = docker_image.nginx.image_id
  name  = "tutorial"

  ports {
    internal = 80
    external = 8000
  }
}
