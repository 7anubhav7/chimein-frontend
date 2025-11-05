terraform {
  backend "s3" {
    bucket  = "chimein-client-terraform-state"
    region  = "ap-south-1"
    key     = "develop/chimein-client.tfstate"
    encrypt = true
  }
}

locals {
  prefix = "${var.prefix}-${terraform.workspace}"
  common_tags = {
    Environment = terraform.workspace
    Project     = var.project
    ManagedBy   = "Terraform"
    Owner       = "Anubhav Hajela"
  }
}
