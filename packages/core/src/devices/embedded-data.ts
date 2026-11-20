import type { JsonObject } from "../types.js";

/** Auto-generated from data/devices/*.yml — do not hand-edit. */
export const DEVICE_DATA: Record<string, JsonObject> = {
  "frr": {
    "description": "FRR container",
    "interface_name": "eth{ifindex}",
    "mgmt_if": "eth0",
    "loopback_interface_name": "lo{ifindex if ifindex else \"\"}",
    "tunnel_interface_name": "tun{ifindex}",
    "lag_interface_name": "bond{lag.ifindex}",
    "role": "router",
    "routing": {
      "_rm_per_af": true
    },
    "sr": {
      "srgb": {
        "start": 24000,
        "size": 8000
      }
    },
    "group_vars": {
      "ansible_network_os": "frr",
      "ansible_python_interpreter": "auto_silent",
      "netlab_initial": "always",
      "netlab_linux_packages": {
        "gnupg": "gpg",
        "curl": "curl",
        "iproute2": "bridge"
      },
      "netlab_frr_daemons": {
        "bfd": [
          "bfdd"
        ],
        "bgp": [
          "bgpd"
        ],
        "ospf": [
          "ospfd",
          "ospf6d"
        ],
        "ripv2": [
          "ripd",
          "ripngd"
        ],
        "isis": [
          "isisd"
        ],
        "vrf": [
          "bgpd"
        ],
        "gateway": [
          "vrrpd"
        ],
        "mpls": [
          "ldpd"
        ]
      }
    },
    "mtu": 1500,
    "clab": {
      "group_vars": {
        "ansible_connection": "docker",
        "ansible_user": "root",
        "netlab_show_command": [
          "vtysh",
          "-c",
          "show $@"
        ],
        "netlab_mgmt_vrf": true,
        "netlab_config_mode": "sh",
        "netlab_default_shebang": "#!/usr/bin/vtysh -f",
        "netlab_config_exec": [
          "sleep 1"
        ]
      },
      "features": {
        "initial": {
          "config_mode": [
            "sh"
          ]
        }
      },
      "image": "quay.io/frrouting/frr:10.6.1",
      "kmods": {
        "initial": [
          "vrf?"
        ]
      },
      "node": {
        "kind": "linux",
        "config_templates": {
          "daemons": "/etc/frr/daemons",
          "hosts": "/etc/hosts:shared"
        }
      }
    },
    "libvirt": {
      "image": "debian/bookworm64",
      "create_image": "netlab/frr",
      "create_template": "frr.xml.j2",
      "create_iso": "frr",
      "group_vars": {
        "ansible_connection": "paramiko",
        "ansible_user": "vagrant",
        "ansible_ssh_pass": "vagrant",
        "ansible_ssh_private_key_file": ".vagrant/machines/{{ inventory_hostname }}/libvirt/private_key",
        "netlab_show_command": [
          "sudo",
          "vtysh",
          "-c",
          "show $@"
        ]
      }
    },
    "external": {
      "image": "none"
    },
    "features": {
      "initial": {
        "ipv4": {
          "unnumbered": true
        },
        "ipv6": {
          "lla": true,
          "use_ra": true
        },
        "ra": true,
        "roles": [
          "host",
          "router",
          "bridge"
        ],
        "generate_mac": [
          "svi"
        ],
        "collect": true,
        "reload": true
      },
      "bfd": true,
      "bgp": {
        "activate_af": true,
        "advertise": true,
        "ipv6_lla": true,
        "rfc8950": true,
        "local_as": true,
        "local_as_ibgp": true,
        "vrf_local_as": true,
        "import": [
          "ospf",
          "ripv2",
          "isis",
          "connected",
          "static",
          "vrf"
        ],
        "community": {
          "standard": [
            "standard",
            "large"
          ],
          "large": [
            "large"
          ],
          "extended": [
            "extended"
          ],
          "2octet": [
            "standard"
          ]
        },
        "confederation": true,
        "allowas_in": true,
        "as_override": true,
        "bfd": true,
        "default_originate": true,
        "description": true,
        "gr": true,
        "gtsm": true,
        "passive": true,
        "password": true,
        "remove_private_as.valid": [
          "on",
          "all",
          "replace"
        ],
        "rs": true,
        "rs_client": true,
        "role": true,
        "timers": true,
        "_default_locpref": true,
        "aggregate": true,
        "bandwidth": {
          "in": "int",
          "out": "int"
        },
        "multihop.vrf": true
      },
      "evpn": {
        "irb": true,
        "asymmetrical_irb": true,
        "multi_rt": true,
        "transport": [
          "vxlan"
        ],
        "ipv6": true
      },
      "gateway": {
        "protocol": [
          "vrrp",
          "anycast"
        ]
      },
      "isis": {
        "circuit_type": true,
        "import": [
          "bgp",
          "ripv2",
          "ospf",
          "connected",
          "static",
          "vrf"
        ],
        "unnumbered": {
          "ipv4": true,
          "ipv6": true,
          "network": true
        }
      },
      "lag": {
        "passive": false
      },
      "mpls": {
        "ldp": true,
        "vpn": {
          "ipv4": true
        }
      },
      "ospf": {
        "unnumbered": true,
        "import": [
          "bgp",
          "ripv2",
          "isis",
          "connected",
          "static",
          "vrf"
        ],
        "default": true,
        "gr": [
          "ipv4",
          "ipv6"
        ],
        "password": true,
        "priority": true,
        "timers": true,
        "areas": true
      },
      "ripv2": {
        "ipv4": true,
        "ipv6": true,
        "passive": true,
        "import": [
          "bgp",
          "isis",
          "ospf",
          "connected",
          "static",
          "vrf"
        ]
      },
      "routing": {
        "policy": {
          "set": {
            "locpref": true,
            "med": true,
            "weight": true,
            "prepend": true,
            "community": {
              "standard": true,
              "large": true,
              "extended": true,
              "append": true
            }
          },
          "match": {
            "prefix": true,
            "nexthop": true,
            "aspath": true,
            "community": {
              "standard": true,
              "large": true
            }
          },
          "delete": {
            "community": "clist"
          }
        },
        "prefix": true,
        "aspath": true,
        "community": {
          "standard": true,
          "large": true
        },
        "static": {
          "vrf": true,
          "inter_vrf": true,
          "discard": true
        }
      },
      "sr": {
        "af": [
          "ipv4",
          "ipv6"
        ],
        "protocol": [
          "isis",
          "ospfv2"
        ]
      },
      "srv6": {
        "bgp": true,
        "isis": true,
        "vpn": true
      },
      "stp": {
        "supported_protocols": [
          "stp"
        ],
        "enable_per_port": false
      },
      "tunnel": {
        "gre": [
          "vrf"
        ],
        "wireguard": [
          "vrf"
        ]
      },
      "vlan": {
        "mixed_trunk": true,
        "model": "router",
        "native_routed": true,
        "subif_name": "{ifname}.{vlan.access_id}",
        "svi_interface_name": "vlan{vlan}"
      },
      "vrf": {
        "keep_module": true,
        "ospfv2": true,
        "ospfv3": true,
        "ripv2": true,
        "ripng": true,
        "bgp": true,
        "isis": true
      },
      "vxlan": {
        "vtep6": true
      }
    },
    "graphite.icon": "router",
    "attributes": {
      "global": {
        "frr": {
          "debug": {
            "type": "list",
            "split_lines": true
          },
          "daemons": {
            "type": "list",
            "_subtype": "str"
          },
          "logfile": "str"
        }
      },
      "node": {
        "frr": {
          "debug": {
            "type": "list",
            "split_lines": true
          },
          "daemons": {
            "type": "list",
            "_subtype": "str"
          },
          "logfile": "str"
        }
      }
    }
  },
  "ios": {
    "description": "Generic Cisco IOS device (meta device, used only as parent)",
    "_meta_device": true,
    "template": true,
    "attributes": {
      "global": {
        "ios": {
          "debug": {
            "type": "list",
            "split_lines": true
          }
        }
      },
      "node": {
        "ios": {
          "debug": {
            "type": "list",
            "split_lines": true
          }
        }
      }
    },
    "loopback_interface_name": "Loopback{ifindex}",
    "tunnel_interface_name": "Tunnel{ifindex}",
    "group_vars": {
      "ansible_become_method": "enable",
      "ansible_network_os": "ios",
      "ansible_connection": "network_cli",
      "netlab_ssh_args": "-o KexAlgorithms=+diffie-hellman-group-exchange-sha1 -o PubkeyAcceptedKeyTypes=ssh-rsa -o HostKeyAlgorithms=+ssh-rsa"
    },
    "clab": {
      "group_vars": {
        "ansible_ssh_pass": "admin",
        "ansible_user": "admin",
        "ansible_become_password": "admin",
        "netlab_check_retries": 50,
        "netlab_ready": [
          "ssh"
        ]
      },
      "features": {
        "initial": {
          "config_mode": [
            "startup"
          ]
        }
      }
    },
    "role": "router",
    "routing": {
      "_rm_per_af": true
    },
    "evpn._start_transit_vlan": 3800,
    "features": {
      "bfd": true,
      "bgp": {
        "activate_af": true,
        "advertise": true,
        "local_as": true,
        "vrf_local_as": true,
        "local_as_ibgp": true,
        "import": [
          "ospf",
          "isis",
          "ripv2",
          "connected",
          "static",
          "vrf"
        ],
        "community": {
          "standard": [
            "standard"
          ],
          "extended": [
            "extended"
          ]
        },
        "confederation": true,
        "allowas_in": true,
        "as_override": true,
        "bfd": true,
        "default_originate": true,
        "gtsm": true,
        "passive": true,
        "password": true,
        "remove_private_as.valid": [
          "on",
          "all",
          "replace"
        ],
        "rs": true,
        "rs_client": true,
        "timers": true,
        "_default_locpref": true,
        "aggregate": true,
        "bandwidth": {
          "in": "auto"
        },
        "multihop.vrf": true
      },
      "dhcp": {
        "client": {
          "ipv4": true,
          "ipv6": true,
          "routing": true
        },
        "relay": true,
        "vrf": true,
        "server": true
      },
      "eigrp": true,
      "initial": {
        "ipv4": {
          "unnumbered": [
            "tunnel"
          ]
        },
        "ipv6": {
          "lla": true,
          "use_ra": true
        },
        "roles": [
          "host",
          "router",
          "bridge"
        ],
        "mgmt_vrf": true,
        "ra": true,
        "collect": true,
        "reload": true
      },
      "isis": {
        "circuit_type": true,
        "import": [
          "bgp",
          "ospf",
          "ripv2",
          "connected",
          "static"
        ],
        "unnumbered": {
          "ipv4": true,
          "ipv6": true,
          "network": true
        }
      },
      "mpls": {
        "ldp": true,
        "bgp": true,
        "vpn": true,
        "6pe": true
      },
      "ospf": {
        "unnumbered": true,
        "import": [
          "bgp",
          "isis",
          "ripv2",
          "connected",
          "static",
          "vrf"
        ],
        "default.policy": true,
        "password": true,
        "priority": true,
        "timers": true,
        "areas": {
          "external_range": "Cisco IOS cannot configure NSSA type-7 ranges",
          "external_filter": "Cisco IOS cannot suppress NSSA type-7 ranges"
        }
      },
      "ripv2": {
        "ipv4": true,
        "ipv6": true,
        "passive": true,
        "unnumbered": true,
        "import": [
          "bgp",
          "isis",
          "ospf",
          "connected",
          "static",
          "vrf"
        ]
      },
      "routing": {
        "policy": {
          "set": {
            "locpref": true,
            "med": true,
            "weight": true,
            "prepend": true,
            "community": {
              "standard": true,
              "append": true
            }
          },
          "delete": {
            "community": "clist"
          },
          "match": {
            "prefix": true,
            "nexthop": true,
            "aspath": true,
            "community": {
              "standard": true
            }
          }
        },
        "prefix.strict": true,
        "aspath": true,
        "community": {
          "standard": true
        },
        "static": {
          "vrf": true,
          "inter_vrf": true,
          "discard": true
        }
      },
      "tunnel": {
        "gre": [
          "vrf"
        ]
      },
      "vlan": {
        "model": "router",
        "svi_interface_name": "BVI{bvi}",
        "subif_name": "{ifname}.{subif_index}",
        "mixed_trunk": true,
        "native_routed": true
      },
      "vrf": {
        "ospfv2": true,
        "ospfv3": true,
        "bgp": true,
        "ripv2": true,
        "ripng": true
      },
      "gateway": {
        "protocol": [
          "vrrp"
        ]
      }
    },
    "external": {
      "image": "none"
    },
    "graphite.icon": "router"
  },
  "iosv": {
    "description": "Cisco IOSv",
    "parent": "ios",
    "interface_name": "GigabitEthernet0/{ifindex}",
    "group_vars": {
      "netlab_device_type": "ios",
      "ansible_user": "vagrant",
      "ansible_ssh_pass": "vagrant",
      "ansible_become_password": "vagrant"
    },
    "libvirt": {
      "image": "cisco/iosv",
      "build": "https://netlab.tools/labs/iosv/",
      "create_template": "iosv.xml.j2"
    },
    "features": {
      "initial": {
        "min_mtu": 64,
        "max_mtu": 9600
      }
    },
    "clab": {
      "image": "vrnetlab/cisco_vios:15.9.3",
      "node": {
        "kind": "cisco_vios"
      },
      "interface.name": "eth{ifindex}",
      "build": "https://github.com/srl-labs/vrnetlab/tree/master/vios"
    }
  },
  "linux": {
    "description": "Generic Linux host",
    "interface_name": "eth{ifindex}",
    "lag_interface_name": "bond{lag.ifindex}",
    "loopback_interface_name": "lo{ifindex if ifindex else \"\"}",
    "mgmt_if": "eth0",
    "role": "host",
    "features": {
      "lag": {
        "passive": false
      },
      "routing": {
        "static": true
      },
      "initial": {
        "collect": false,
        "reload": false,
        "ipv4": {
          "unnumbered": "peer"
        },
        "ipv6": {
          "lla": true,
          "use_ra": true
        },
        "roles": [
          "host"
        ]
      }
    },
    "libvirt": {
      "image": "bento/ubuntu-24.04",
      "create_image": "netlab/linux",
      "create_template": "frr.xml.j2",
      "create_iso": "linux",
      "group_vars": {
        "netlab_linux_distro": "ubuntu"
      },
      "features": {
        "dhcp": {
          "client": {
            "ipv4": true,
            "ipv6": true
          },
          "server": true,
          "relay": {
            "ipv4": true
          }
        }
      }
    },
    "group_vars": {
      "ansible_network_os": "linux",
      "ansible_connection": "paramiko",
      "ansible_user": "vagrant",
      "ansible_ssh_pass": "vagrant",
      "docker_shell": "sh -il",
      "ansible_python_interpreter": "auto_silent",
      "netlab_lldp_enable": false,
      "netlab_net_tools": false
    },
    "clab": {
      "node_config": {
        "initial": ":ns",
        "lag": ":ns",
        "vlan": ":ns",
        "routing": ":ns"
      },
      "features": {
        "initial": {
          "roles": [
            "host",
            "bridge"
          ],
          "generate_mac": [
            "svi"
          ],
          "config_mode": [
            "sh"
          ]
        },
        "vlan": {
          "mixed_trunk": true,
          "model": "router",
          "native_routed": true,
          "subif_name": "{ifname}.{vlan.access_id}",
          "svi_interface_name": "vlan{vlan}"
        }
      },
      "image": "python:3.13-alpine",
      "mtu": 1500,
      "kmods": null,
      "node": {
        "kind": "linux",
        "config_templates": {
          "hosts": "/etc/hosts:shared"
        }
      },
      "group_vars": {
        "ansible_connection": "docker",
        "ansible_user": "root",
        "netlab_linux_distro": "vanilla"
      }
    },
    "external": {
      "image": "none"
    },
    "graphite.icon": "server"
  },
  "none": {
    "description": "Dummy device used to test topology transformation",
    "_meta_device": true,
    "interface_name": "eth{ifindex}",
    "lag_interface_name": "bond{lag.ifindex}",
    "loopback_interface_name": "Loopback{ifindex}",
    "tunnel_interface_name": "Tunnel{ifindex}",
    "libvirt": {
      "image": "none"
    },
    "clab": {
      "image": "none"
    },
    "external": {
      "image": "none"
    },
    "group_vars": {
      "ansible_connection": "paramiko_ssh",
      "ansible_network_os": "none"
    },
    "features": {
      "bfd": true,
      "bgp": {
        "activate_af": true,
        "advertise": true,
        "aggregate": true,
        "local_as": true,
        "vrf_local_as": true,
        "local_as_ibgp": true,
        "role": true,
        "ipv6_lla": true,
        "rfc8950": true,
        "bandwidth": true,
        "multihop.vrf": true,
        "allowas_in": true,
        "as_override": true,
        "bfd": true,
        "default_originate": true,
        "description": true,
        "gr": true,
        "gtsm": true,
        "passive": true,
        "password": true,
        "remove_private_as": true,
        "rs_client": true,
        "rs": true,
        "tcp_ao": [
          "libvirt",
          "external"
        ],
        "timers": true,
        "import": [
          "ospf",
          "isis",
          "ripv2",
          "connected",
          "static",
          "vrf"
        ],
        "confederation": true
      },
      "dhcp": {
        "client": {
          "ipv4": true,
          "ipv6": true,
          "routing": true
        },
        "relay": true,
        "vrf": true,
        "server": true
      },
      "eigrp": true,
      "evpn": {
        "irb": true,
        "asymmetrical_irb": true,
        "bundle": [
          "vlan_aware"
        ],
        "multi_rt": true,
        "ipv6": true,
        "transport": [
          "vxlan",
          "mpls",
          "sr"
        ]
      },
      "gateway": {
        "protocol": [
          "anycast",
          "vrrp"
        ]
      },
      "initial": {
        "ipv4": {
          "unnumbered": true
        },
        "ipv6": {
          "lla": true
        },
        "mgmt_vrf": true,
        "ra": true,
        "roles": [
          "router",
          "bridge",
          "host"
        ],
        "collect": true,
        "reload": true
      },
      "isis": {
        "import": [
          "bgp",
          "ospf",
          "ripv2",
          "connected",
          "vrf"
        ],
        "vrf": true,
        "unnumbered": {
          "ipv4": true,
          "ipv6": true,
          "network": true
        }
      },
      "lag": {
        "mlag": true,
        "passive": true
      },
      "mpls": {
        "ldp": true,
        "bgp": true,
        "vpn": true,
        "6pe": true
      },
      "ospf": {
        "areas": true,
        "unnumbered": true,
        "import": [
          "bgp",
          "isis",
          "ripv2",
          "connected",
          "static",
          "vrf"
        ],
        "default.policy": true,
        "gr": [
          "ipv4",
          "ipv6"
        ],
        "password": true,
        "priority": true,
        "timers": true
      },
      "ripv2": {
        "ipv4": true,
        "ipv6": true,
        "passive": true,
        "import": [
          "bgp",
          "isis",
          "ospf",
          "connected",
          "vrf"
        ]
      },
      "routing": {
        "policy": {
          "set": {
            "locpref": true,
            "med": true,
            "weight": true,
            "prepend": true,
            "community": true
          },
          "match": {
            "prefix": true,
            "nexthop": true,
            "aspath": true,
            "community": {
              "standard": true,
              "large": true
            }
          },
          "delete": {
            "community": true
          }
        },
        "prefix": true,
        "aspath": true,
        "community": {
          "standard": true,
          "large": true
        },
        "static": {
          "vrf": true,
          "inter_vrf": true,
          "discard": true
        }
      },
      "sr": {
        "af": [
          "ipv4",
          "ipv6"
        ],
        "protocol": [
          "isis",
          "ospfv2"
        ]
      },
      "srv6": {
        "isis": true,
        "ospf": true,
        "bgp": true,
        "vpn": true
      },
      "stp": {
        "supported_protocols": [
          "stp",
          "rstp",
          "mstp",
          "pvrst"
        ],
        "enable_per_port": true,
        "port_type": true
      },
      "vlan": {
        "model": "router",
        "subif_name": "{ifname}.{subif_index}",
        "svi_interface_name": "Vlan{vlan}",
        "mixed_trunk": true,
        "native_routed": true
      },
      "vrf": {
        "ospfv2": true,
        "ospfv3": true,
        "bgp": true,
        "ripv2": true,
        "ripng": true,
        "isis": true
      },
      "vxlan": {
        "vtep6": true
      },
      "tunnel": {
        "gre": [
          "vrf"
        ],
        "wireguard": [
          "vrf"
        ]
      }
    }
  }
};

/** Auto-generated from data/daemons/*.yml — do not hand-edit. */
export const DAEMON_DATA: Record<string, JsonObject> = {
  "bird": {
    "description": "BIRD Internet Routing Daemon",
    "group_vars": {
      "netlab_import_map": {
        "bgp": "RTS_BGP",
        "ospf": "RTS_OSPF",
        "connected": "RTS_DEVICE",
        "static": "RTS_STATIC_DEVICE,RTS_STATIC"
      }
    },
    "packages": {
      "bird": "bird"
    },
    "daemon_config": {
      "bird": "/etc/bird/bird.conf",
      "bfd": "/etc/bird/bfd.conf",
      "bgp": "/etc/bird/bgp.mod.conf",
      "bgp@session": "/etc/bird/bgp.session.conf",
      "bgp@policy": "/etc/bird/bgp.policy.conf",
      "ospf@areas": "/etc/bird/ospf.areas.conf",
      "ospf": "/etc/bird/ospf.mod.conf",
      "routing": "/etc/bird/routing.mod.conf",
      "evpn": "/etc/bird/evpn.mod.conf"
    },
    "clab": {
      "group_vars": {
        "netlab_show_command": [
          "birdcl",
          "show $@"
        ],
        "docker_shell": "bash -il",
        "netlab_config_mode": "sh",
        "netlab_start_daemon": "/usr/sbin/bird -d -c /etc/bird/bird.conf"
      },
      "image": "netlab/bird:latest",
      "build": true,
      "sw_version": "2.19.1",
      "sw_download_url": "https://bird.nic.cz/download/bird-{sw_version}.tar.gz",
      "features": {
        "initial": {
          "roles": [
            "host",
            "router"
          ],
          "config_mode": [
            "sh"
          ],
          "dataplane_config": [
            "vxlan",
            "vrf"
          ],
          "extra_daemon_config": {
            "vrf": "/etc/bird/vrf.mod.conf"
          }
        }
      }
    },
    "libvirt": {
      "image": null
    },
    "virtualbox": {
      "image": null
    },
    "features": {
      "bfd": true,
      "bgp": {
        "activate_af": true,
        "advertise": true,
        "ipv6_lla": false,
        "rfc8950": true,
        "local_as": true,
        "vrf_local_as": true,
        "local_as_ibgp": true,
        "community": {
          "standard": [
            "standard",
            "large"
          ],
          "large": [
            "large"
          ],
          "extended": [
            "extended"
          ],
          "2octet": [
            "standard"
          ]
        },
        "import": [
          "ospf",
          "connected",
          "static",
          "vrf"
        ],
        "bfd": true,
        "default_originate": "static",
        "gtsm": true,
        "passive": true,
        "password": true,
        "remove_private_as": true,
        "rs": true,
        "rs_client": true,
        "role": true,
        "confederation": true,
        "timers": true
      },
      "ospf": {
        "import": [
          "bgp",
          "connected",
          "static",
          "vrf"
        ],
        "default": true,
        "gr": [
          "ipv4",
          "ipv6"
        ],
        "password": true,
        "priority": true,
        "timers": true,
        "unnumbered": true,
        "areas": true
      },
      "routing": {
        "static": {
          "vrf": true,
          "inter_vrf": true,
          "discard": true
        }
      },
      "dhcp": false,
      "gateway": {
        "protocol": [
          "anycast"
        ]
      },
      "initial": {
        "ipv4": {
          "unnumbered": "peer"
        },
        "ipv6": {
          "lla": true
        },
        "reload": false,
        "roles": [
          "host",
          "router"
        ]
      },
      "vxlan": {
        "vtep6": true
      },
      "vrf": {
        "ospfv2": true,
        "ospfv3": true,
        "bgp": true
      },
      "evpn": {
        "transport": [
          "vxlan"
        ]
      }
    }
  }
};

